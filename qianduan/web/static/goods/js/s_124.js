
$(function(){
    //图片上传
    var add_imgi = 1;

    function ajaxSubmit($el) {
        // var SERVER_URL = 'http://192.168.0.167:9010/';
        var token = Admin.get_token();
        //var token = '2017052516045457073-1-1';
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
                $el.parent().before('<li><input class="hide_input" type="file" id="upimgFile_' + add_imgi + '"/><img class="img_src" id="imgShow_' + add_imgi + '"/><i class="del_img">-</i></li>');
                $("#imgShow_" + add_imgi + "").attr("src", SERVER_URL + data.imgurl);
                add_imgi++;
                //console.log(data);
            },
            onProgress: function (e) {
                var per = Math.round(e.loaded * 100 / e.total);
                $('.complete').css('width', per + '%')
            }
        });
        $el.upload("ajaxSubmit");
    }

    $('.pro_goods_create_upload_img_btn').live('change', function () {
        ajaxSubmit($(this));
    });

    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
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

    //获取当前系统时间  年-月-日  时: 分: 秒
    function getCurrentDate() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate()) + '&nbsp;&nbsp;&nbsp;' + l_dbl(oDate.getHours()) + ':' + l_dbl(oDate.getMinutes()) + ':' + l_dbl(oDate.getSeconds());
        return sTime
    }

    //获取当前系统时间  年-月-日
    function getCurrentDateDay() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate());
        return sTime
    }

    //自动生成编号函数
    function likGetCodeFn(arg) {
        var needCode = '';
        $.ajax({
            url: SERVER_URL + '/admin/autoload',
            type: 'GET',
            data: {token: token, args: arg},
            async: false,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    needCode = oE['data'];
                }
            }
        });
        return needCode;
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

    function moneyToFixed(money) {
        return money.toFixed(2);
    }

    var token, page, num, keywords, type;
    token = Admin.get_token();
    // token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    uname = '管理员';




    //查询SN码
    var searchNum;
    //$('.sq_search_inp').die().live('keyup',function(){
    //    searchNum = $(this).val();
    //});
    $('.inp_addBtn .goods_search_save').live('click',function(){
        searchNum = $('.sq_search_inp').val();
        $.ajax({
            url: SERVER_URL + '/product/infobysn',
            type: 'GET',
            data:{
                token:token,
                sn:searchNum
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if(oE.code ==0){
                    console.log('查询成功');
                    var datalist=oE.data;
                    if(datalist.length == 0){
                        $('.goods_search_content_c').removeClass('none');
                        $('.goods_search_content_no').removeClass('none');
                        $('.goods_search_content_num').html(searchNum);
                    }else{
                        $('.goods_search_content_yes').removeClass('none');
                        $('.goods_search_content_num').html(searchNum);
                        //**********商品信息**************
                        //商品编号
                        $('.productInfo_code_sn').html(datalist['productInfo']['code_sn']);
                        //商品名称
                        $('.productInfo_product_name').html(datalist['productInfo']['product_name']);
                        //计算单位
                        $('.productInfo_unit_name').html(datalist['productInfo']['unit_name']);
                        //属性
                        $('.productInfo_attr_name').html(datalist['productInfo']['attr_name']);
                        //**********关联整机信息***********
                        //商品编号
                        $('.settingInfo_code_sn').html(datalist['settingInfo']['code_sn']);
                        //商品名称
                        $('.settingInfo_product_name').html(datalist['settingInfo']['product_name']);
                        //计算单位
                        $('.settingInfo_unit_name').html(datalist['settingInfo']['unit_name']);
                        //属性
                        $('.settingInfo_attr_name').html(datalist['settingInfo']['attr_name']);
                        //sn码
                        $('.settingInfo_sn').html(datalist['settingInfo']['sn']);
                        //***********采购信息***********
                        //采购订单编号
                        $('.purchaseInfo_purchase_sn').html(datalist['purchaseInfo']['purchase_sn']);
                        //采购日期
                        $('.purchaseInfo_purchase_time').html(datalist['purchaseInfo']['purchase_time']);
                        //供应商名称
                        $('.purchaseInfo_purchase_name').html(datalist['purchaseInfo']['purchase_name']);
                        //***********入库信息***********
                        //采购时间
                        $('.inputInfo_input_time').html(datalist['inputInfo']['input_time']);
                        //管理员
                        $('.inputInfo_input_name').html(datalist['inputInfo']['input_name']);
                    }
                }
            }
        });
        return false;
    });



    //查询序列号
    var searchTwoNum;
    $('.inp_addBtn .goods_search_save_two').live('click',function(){
        searchTwoNum = $('.sq_search_inp_two').val();
        $.ajax({
            url: SERVER_URL + '/product/infobysn',
            type: 'GET',
            data:{
                token:token,
                serial_number:searchTwoNum
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if(oE.code ==0){
                    console.log('查询成功');
                    var datalist=oE.data;
                    if(datalist.length == 0){
                        $('.goods_search_content_c').removeClass('none');
                        $('.goods_search_content_no').removeClass('none');
                        $('.goods_search_content_num_two').html(searchTwoNum);
                        //$('.goods_search_number_box').css('height','30%');
                        $('.goods_search_content_bb').addClass('none');
                    }else{
                        $('.goods_search_content_yes').removeClass('none');
                        $('.goods_search_content_bc').removeClass('none');
                        $('.goods_search_content_num_two').html(searchTwoNum);
                        //**********商品信息**************
                        //商品编号
                        $('.productInfo_code_sn').html(datalist['productInfo']['code_sn']);
                        //商品名称
                        $('.productInfo_product_name').html(datalist['productInfo']['product_name']);
                        //计算单位
                        $('.productInfo_unit_name').html(datalist['productInfo']['unit_name']);
                        //属性
                        $('.productInfo_attr_name').html(datalist['productInfo']['attr_name']);
                        //**********关联整机信息***********
                        //商品编号
                        $('.settingInfo_code_sn').html(datalist['settingInfo']['code_sn']);
                        //商品名称
                        $('.settingInfo_product_name').html(datalist['settingInfo']['product_name']);
                        //计算单位
                        $('.settingInfo_unit_name').html(datalist['settingInfo']['unit_name']);
                        //属性
                        $('.settingInfo_attr_name').html(datalist['settingInfo']['attr_name']);
                        //sn码
                        $('.settingInfo_sn').html(datalist['settingInfo']['sn']);
                        //***********采购信息***********
                        //采购订单编号
                        $('.purchaseInfo_purchase_sn').html(datalist['purchaseInfo']['purchase_sn']);
                        //采购日期
                        $('.purchaseInfo_purchase_time').html(datalist['purchaseInfo']['purchase_time']);
                        //供应商名称
                        $('.purchaseInfo_purchase_name').html(datalist['purchaseInfo']['purchase_name']);
                        //***********入库信息***********
                        //采购时间
                        $('.inputInfo_input_time').html(datalist['inputInfo']['input_time']);
                        //管理员
                        $('.inputInfo_input_name').html(datalist['inputInfo']['input_name']);
                    }
                }
            }
        });
        return false;
    });


    //刷新
    $('.goods_search_number_res').live('click',function(){
        $('.goods_search_content_yes').addClass('none');
        $('.goods_search_number_box').css('height','24%');
        $('.sq_search_inp').val('');
        $('.sq_search_inp_two').val('');
    });






});
