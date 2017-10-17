$(function () {
    //补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }

    //json数组去重
    function getJsonArr(arr) {
        //定义需要的空数组
        var newArr = [];
        //定义转换字符串后的数组
        var newStringArr = [];
        //对arr数组进行遍历
        $.each(arr, function (i, v) {
            //json对象转换为字符串
            var sArr = JSON.stringify(v);
            if ($.inArray(sArr, newStringArr) == -1) {
                //根据字符串数组push对象
                newStringArr.push(sArr);
                newArr.push(v)
            }
        });
        return newArr;
    }

    //获取当前系统时间 年-月-日 时：分：秒
    function getCurrentDate() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate()) + '&nbsp;&nbsp;&nbsp;' + l_dbl(oDate.getHours()) + ':' + l_dbl(oDate.getMinutes()) + ':' + l_dbl(oDate.getSeconds());
        return sTime;
    }

    //获取当前系统时间  年-月-日
    function getCurrentDateDay() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate());
        return sTime
    }

    var token, uname, page, num, keywords, thetype;
    //token = '2017052516045457073-1-1';
    token = Admin.get_token();
    uid = Admin.get_uid();
    uname = loginUserInfo['username'];

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var fncRefundPowerList = loginUserInfo['powerUrls'];
        //查看已付票
        var fncRefundYes = 'refund-ticket/list';
        //标记已收
        var fncRefundAdd = 'refund-ticket/flag';
        //标记已收
        var fncRefundSet = 'output-ticket/set';

        //查看已付票
        if ($.inArray(fncRefundYes, fncRefundPowerList) == -1) {
            $('#fnc_output_ticket_nav_ul').html('<li name="finance_pay_rent_a" class="taba tabhover">未付票</li>');
        } else {
            $('#fnc_output_ticket_nav_ul').html('<li name="finance_pay_rent_a" class="taba tabhover">未付票</li><li name="finance_pay_rent_a" class="taba">已付票</li>');
        }

        //标记已收
        var fncRefundAddClass = '';
        if ($.inArray(fncRefundAdd, fncRefundPowerList) == -1) {
            fncRefundAddClass = 'none';
        } else {
            fncRefundAddClass = '';
        }

        //付票设置
        if ($.inArray(fncRefundSet, fncRefundPowerList) == -1) {
            $('.fnc_output_ticket_setting_nav').css('width', '46px').html('<div id="fnc_output_ticket_refresh_btn" class="res" title="点击刷新"></div>');
        } else {
            $('.fnc_output_ticket_setting_nav').css('width', '134px').html('<button class="but_blue val_dialog ht_but" name="finance_pay_rent_setting">付票设置</button><div id="fnc_output_ticket_refresh_btn" class="res" title="点击刷新"></div>');
        }
    }

//**************选择查看项*****************************
    //未收退票定义选择查看项
    var fnNoTicketNoListLookAbledField = [
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'}
    ];
    likShow('#fnc_no_ticket_no_table', fnNoTicketNoListLookAbledField, '#fnc_no_ticket_no_look_field_ul', '#fnc_no_ticket_no_look_field_save', '#fnc_no_ticket_no_look_field_reset');
    //已收退票定义选择查看项
    var fnTicketNoListLookAbledField = [
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'}
    ];
    likShow('#fnc_recede_ticket_yes_table', fnTicketNoListLookAbledField, '#fnc_recede_ticket_yes_look_field_ul', '#fnc_recede_ticket_yes_look_field_save', '#fnc_recede_ticket_yes_look_field_reset');
    //销项退票参数
    var getRecedeTicketListData = {
        token: token,
        page: 1,
        num: 10,
        keywords: '',//关键字
        thetype: 1,//1未收退票/2已收退票
        day: ''//应收退票日期
    };
    getNorecedeTicketListFn();
    //未收退票列表函数
    function getNorecedeTicketListFn(){
        $.ajax({
            url: SERVER_URL + '/refund-ticket/list',
            type:'GET',
            data:getRecedeTicketListData,
            dataType:'json',
            success:function(oE) {
                //将返回值转换为json对象
                console.log(oE);
                if (oE.code == 0) {
                    //搜索总条数
                    $('.fnc_norecede_ticket_list_num_total').html(oE.totalcount);
                    //应收退票款
                    $('.fnc_refund_no_ticket_total').html(oE.no_ticket_total);
                    //总应收退票款
                    $('.fnc_refund_total_ticket').html(oE.total_ticket);
                    //已收退票款
                    $('.fnc_refund_already_ticket').html(oE.already_ticket);
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.fnc_norecede_ticket_list_nodata_box').removeClass('none');
                        $('.fnc_norecede_ticket_list_yes_handle').addClass('none');
                        $('.fnc_norecede_ticket_list_table_total').addClass('none');
                    } else {
                        $('.fnc_norecede_ticket_list_nodata_box').addClass('none');
                        $('.fnc_norecede_ticket_list_yes_handle').removeClass('none');
                        $('.fnc_norecede_ticket_list_table_total').removeClass('none');
                    }
                    var norecedeHtml = '';
                    console.log(datalist);
                    $.each(datalist, function (i, v) {
                        norecedeHtml += '<tr fncnorecedeid="' + v['id'] + '">\
                        <td>' + l_dbl(i + 1) + '</td>\
                        <td class="finance_pay_rent_list f_color">' + likNullData(v['reproduct_code_sn']) + '</td>\
                        <td class="finance_pay_rent_list f_color">' + likNullData(v['market_order_code_sn']) + '</td>\
                        <td>' + likNullData(v['cs_name']) + '</td>\
                        <td>' + likNullData(v['owner_name']) + '</td>\
                        <td>' + likNullData(v['day']) + '</td>\
                        <td>' + likNullData(v['ticket_name']) + '</td>\
                        <td>' + likNullData(v['ticket_total']) + '</td>\
                        <td>' + likNullData(v['name']) + '</td>\
                        <td>' + likNullData(v['choice_cuenta']) + '</td>\
                        <td>\
                    <button class="but_mix val_dialog finance_gysyfqk_yfqk_xxtp" name="finance_gysyfqk_yfqk_xxtp">标记已收</button>\
                        </td>\
                        </tr>'
                    });
                    $('.fnc_norecede_ticket_tbody').html(norecedeHtml);
                    //分页
                    list_table_render_pagination('.fnc_norecede_ticket_list_yes_handle', getRecedeTicketListData, getNorecedeTicketListFn, oE.totalcount, datalist.length);
                    $('#fnc_no_ticket_no_look_field_save').trigger('click');
                }
            },
            error: function(e){
                console.log(e)
            }
        });
    }
    //已收退票列表函数
    function getRecedeTicketListFn(){
        $.ajax({
            url: SERVER_URL + '/refund-ticket/list',
            type:'GET',
            data:getRecedeTicketListData,
            dataType:'json',
            success:function(oE) {
                //将返回值转换为json对象
                console.log(oE);
                if (oE.code == 0) {
                    //搜索总条数
                    $('.fnc_norecede_ticket_list_num_total').html(oE.totalcount);
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.fnc_recede_ticket_list_nodata_box').removeClass('none');
                        $('.fnc_yesrecede_ticket_list_yes_handle').addClass('none');
                        $('.fnc_recede_ticket_list_table_total').addClass('none');
                    } else {
                        $('.fnc_recede_ticket_list_nodata_box').addClass('none');
                        $('.fnc_yesrecede_ticket_list_yes_handle').removeClass('none');
                        $('.fnc_recede_ticket_list_table_total').removeClass('none');
                    }
                    var recedeHtml = '';
                    console.log(datalist);
                    $.each(datalist, function (i, v) {
                        recedeHtml += ' <tr fncnorecedeid="' + v['id'] + '">\
                            <td>' + l_dbl(i + 1) + '</td>\
                            <td class="finance_pay_rent_list f_color">' + likNullData(v['reproduct_code_sn']) + '</td>\
                            <td class="finance_pay_rent_list f_color">' + likNullData(v['market_order_code_sn']) + '</td>\
                            <td>' + likNullData(v['cs_name']) + '</td>\
                            <td>' + likNullData(v['owner_name']) + '</td>\
                            <td>' + likNullData(v['day']) + '</td>\
                            <td>缺</td>\
                            <td>' + likNullData(v['ticket_name']) + '</td>\
                        <td>' + likNullData(v['ticket_total']) + '</td>\
                        <td>' + likNullData(v['name']) + '</td>\
                        <td>' + likNullData(v['choice_cuenta']) + '</td>\
                        <td>\
                        <button class="but_mix val_dialog finance_gysyfqk_yfqk_look" name="finance_gysyfqk_yfqk_look">查看</button>\
                            </td>\
                            </tr>'
                    });
                    $('.fnc_recede_ticket_tbody').html(recedeHtml);
                    //分页
                    list_table_render_pagination('.fnc_yesrecede_ticket_list_yes_handle', getRecedeTicketListData, getRecedeTicketListFn, oE.totalcount, datalist.length);
                    $('#fnc_recede_ticket_yes_look_field_save').trigger('click');
                }
            }
        });
    }

    //切换未收退票
    $('#fnc_recede_ticket_nav_ul li:nth-of-type(1)').die('click').live('click',function(){
        getRecedeTicketListData.thetype =1;
        getRecedeTicketListData.page =1;
        getRecedeTicketListData.num =10;
        $('.fnc_norecede_ticket_list_search_num_inp').val('10');
        $('.fnc_norecede_ticket_list_no_search_inp').val('搜索销售退换货编号/客户名称').css('color', '#ccc');
        getRecedeTicketListData.keywords = '';
        getNorecedeTicketListFn();
    });
    //切换已收退票
    $('#fnc_recede_ticket_nav_ul li:nth-of-type(2)').die('click').live('click',function(){
        //alert(1111);
        getRecedeTicketListData.thetype =2;
        getRecedeTicketListData.page =1;
        getRecedeTicketListData.num =10;
        $('.fnc_recede_ticket_list_search_num_inp').val('10');
        $('.fnc_recede_ticket_list_yes_search_inp').val('搜索销售退换货编号/客户名称').css('color', '#ccc');
        getRecedeTicketListData.keywords = '';
        getRecedeTicketListFn();
    });

    //未收退票搜索关键字
    $('#fnc_no_recede_search_btn').die('click').live('click',function(){
        if($('.fnc_norecede_ticket_list_no_search_inp').val() == '搜索销售退换货编号/客户名称'){
            alert('请输入搜索关键字');
            getRecedeTicketListData.keywords = '';
        }else{
            getRecedeTicketListData.keywords = $('.fnc_norecede_ticket_list_no_search_inp').val();
            //console.log($('.fnc_norecede_ticket_list_no_search_inp').val());
        }
        getNorecedeTicketListFn();
    });
    //已收退票搜索关键字
    $('#fnc_recede_search_btn').die('click').live('click',function(){
        if($('.fnc_recede_ticket_list_yes_search_inp').val() == '搜索销售退换货编号/客户名称'){
            alert('请输入搜索关键字');
            getRecedeTicketListData.keywords = '';
        }else{
            getRecedeTicketListData.keywords = $('.fnc_recede_ticket_list_yes_search_inp').val();
        }
        getRecedeTicketListFn();
    });

    //刷新
    $('#fn_recede_refresh').die('click').live('click',function(){
        $('.fnc_norecede_ticket_list_no_search_inp').val('搜索销售退换货编号/客户名称').css('color','#ccc');
        $('.fnc_recede_ticket_list_yes_search_inp').val('搜索销售退换货编号/客户名称').css('color','#ccc');
        getRecedeTicketListData.keywords = '';
        getNorecedeTicketListFn();
        getRecedeTicketListFn();
    });

    //定义当前未收退票id
    var curTicketId= null;


    //标记已收
    $('.finance_gysyfqk_yfqk_xxtp').die('click').live('click',function(){
        //alert(111);
        curTicketId = $(this).closest('tr').attr('fncnorecedeid');
        getNoRefundTicket(curTicketId);
    });
    //标记已收详情函数
    function getNoRefundTicket(curTicketId){
        $.ajax({
            url:SERVER_URL + '/refund-ticket/info',
            type:'GET',
            data:{
                token:token,
                id:curTicketId
            },
            success:function(e){
                //将返回值转换为json对象
                var oE = eval("("+e+")");
                console.log(oE);
                if(oE.code == 0){
                    var data = oE.datalist;
                    //已收票退款
                    $('.tanceng .fnc_norefund_ticket_ticket_total').html(data['ticket_total']);
                    //票号
                    $('.tanceng .fnc_norefund_ticket_ticket_name').html(data['ticket_name']);
                    //付票单编号
                    $('.tanceng .fnc_norefund_ticket_code_sn').html(data['code_sn']);
                    //客户名称
                    $('.tanceng .fnc_norefund_ticket_cs_name').html(data['cs_name']);
                    //销售单编号
                    $('.tanceng .fnc_norefund_ticket_market_order_code_sn').html(data['market_order_code_sn']);
                    //销售退换货编号
                    $('.tanceng .fnc_norefund_ticket_reproduct_code_sn').html(data['reproduct_code_sn']);
                    //结算账户
                    $('.tanceng .fnc_norefund_ticket_name').html(data['name']);
                    //结算账目
                    $('.tanceng .fnc_norefund_choice_cuenta').html(data['choice_cuenta']);
                    //收票日期
                    $('.tanceng .fnc_norefund_day').html(data['day']);
                }
            }
        })
    }

    //标记已收点击确定按钮操作
    $('.fnc_norefund_look_yes_btn').die('click').live('click',function(){
        $.ajax({
            url :SERVER_URL + '/refund-ticket/doflag',
            type:'GET',
            data:{
                token:token,
                id:curTicketId
            },
            success:function(e){
                //将返回值转换为json对象
                var oE = eval("("+e+")");
                console.log(oE);
                if(oE.code == 0){
                    $('.tanceng div').remove();
                    $('.tanceng').css('display', 'none');
                    getNorecedeTicketListFn();
                }
            }
        });
    });

    //已收退票的查看
    ////定义当前已收票id
    //var curYesTicketId = null;
    //查看
    $(".finance_gysyfqk_yfqk_look").die('click').live('click',function(){
        curTicketId = $(this).closest('tr').attr('fncnorecedeid');
        getNoRefundTicket(curTicketId);
    });



});
