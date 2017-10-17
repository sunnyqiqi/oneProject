/*公司信息*/
$(function () {
     var token=Admin.get_token();
   //var token='2017052516045457073-1-1';
    var powerUrls=localStorage.getItem("user_info_url");
    var company_admin=localStorage.getItem("company_admin");
    var compant_id=localStorage.getItem("usercompany_id");
    /*邮箱验证*/
    function CheckMail(mail) {
        var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(mail)) {
            return true;
        }
        else {
            alert('您的电子邮件格式不正确');
            return false;
        }
    }
    /*手机号*/
    function checkMobile(str) {
        var re = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (re.test(str)) {
            return true;
        } else {
            alert("您的手机号输入格式不正确");
        }
    }
    /*固定电话 /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(this.Trim())*/
    function checkContactNumber(mobile) {
        //$("#error").css("display", "none");
        //var mobile = $.trim($("#ContactNumber").val());
        var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
        var isPhone = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;;
        //var error = "<label id=\"error\" class=\"validate_input_error\">请正确填写电话号码，例如:13511111111或010-11111111</label>";
        //如果为1开头则验证手机号码
        if (mobile.substring(0, 1) == 1) {
            if (!isMobile.exec(mobile) && mobile.length != 11) {
                // $("#ContactNumber").after(error);
                // $("#ContactNumber").focus();
                alert("您的手机号输入格式不正确");
                return false;
            }
        }
        //如果为0开头则验证固定电话号码
        else if (mobile.substring(0, 1) == 0) {
            if (!isPhone.test(mobile)) {
                // $("#ContactNumber").after(error);
                // $("#ContactNumber").focus();
                alert("您的电话输入格式不正确");
                return false;
            }
        }
        //否则全部不通过
        else {
            // $("#ContactNumber").after(error);
            // $("#ContactNumber").focus();
            alert("您的手机号或电话输入格式不正确");
            return false;
        }
        return true;
    }
    /*网址 var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/*/
    function checkUrl(str) {
        var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        if (reg.test(str)) {
            return true;
        } else {
            alert("你输入的网址不是以http://https://开头，或者不是网址！");
            return false;
        }
    }
    //校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
    function isTel(object)
    {
        //国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)"

        //var s =document.getElementById(object.id).value;
        var pattern =/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        //var pattern =/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/;
        if(object!="")
        {
            if(!pattern.exec(object))
            {
                alert('请输入正确的电话号码:电话号码格式为国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)"');
                // object.value="";
                // object.focus();
                return false;
            }
        }
    }

    /*身份证var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;*/
    function checknumber(str) {
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (reg.test(str)) {
            return true;
        } else {
            alert("您的身份证号输入格式不正确");
        }
    }
    /*验证数字*/
    function num(n) {
        var reg=/^[0-9]*$/
        if(reg.test(n)){
            return true;
        }else{
            alert("请输入0到9的数字");
        }
    }
    /*验证汉字*/
    function chinese(z){
        var reg=/^[\u4e00-\u9fa5],{0,}$/
        if(reg.test(z)){
            return true;
        }else{
            alert('请中文输入汉字');
        }

    }

    //（15位包括地区编码6位+组织机构代码9位）
   // var taxpayerId = $("#taxpayerId").val();
    //纳税人识别号校验是否合法

// 校验组织机构代码
    function orgcodevalidate(value){
        if(value!=""){
            var part1=value.substring(0,8);
            var part2=value.substring(value.length-1,1);
            var ws = [3, 7, 9, 10, 5, 8, 4, 2];
            var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var reg = /^([0-9A-Z]){8}$/;
            if (!reg.test(part1))
            {
                return true
            }
            var sum = 0;
            for (var i = 0; i< 8; i++)
            {
                sum += str.indexOf(part1.charAt(i)) * ws[i];
            }
            var C9 = 11 - (sum % 11);
            var YC9=part2+'';
            if (C9 == 11) {
                C9 = '0';
            } else if (C9 == 10) {
                C9 = 'X' ;
            } else {
                C9 = C9+'';
            }
            return YC9!=C9;
        }
    }


    // 校验地址码
    function checkAddressCode(addressCode){
        var provinceAndCitys={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
            31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",
            45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",
            65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        var check = /^[1-9]\d{5}$/.test(addressCode);
        if(!check) return false;
        if(provinceAndCitys[parseInt(addressCode.substring(0,2))]){
            return true;
        }else{
            return false;
        }

    }
    var power=JSON.parse(powerUrls);
   // console.log(power)
    var gs_check="company/infobyid";//查看
    var gs_add="company/add";//添加、修改
     var gs_xq="company/list";//详情列表
    // function $(id){
    //     return document.getElementById(id)
    // }
    function getHeight() {
        if ($("left").offsetHeight>=$("right").offsetHeight){
            $("right").style.height=$("left").offsetHeight + "px";
        }
        else{
            $("left").style.height=$("right").offsetHeight + "px";
        }
    }
    window.onload = function() {
        getHeight();
    }

    // 选择查看项
    // 定义查看项
    var venCustomLookAbledField = [
        {'index': null, 'field': '电话'},
        {'index': null, 'field': '传真'},
        {'index': null, 'field': '邮箱'}

    ];
    likShow('.zcj_table_company_data_show', venCustomLookAbledField, '.zcj_select_check_head_list', '.zcj_check_save_btn', '.zcj_check_recover_mr');
    //	补零函数
    function repair(x) {
        return x < 10 ? '0' + x : x
    }
    var info_data={
        token: token,
        id:compant_id
    }
    /*基本信息*/
    function company_info_fn() {
        $.ajax({
            type: "GET",
            url: SERVER_URL + "/corporation/infobyid",
            data: info_data,
            dataType: "json",
            success: function (data) {
                console.log(data);
                var html='';
                if(data.code==0){
                    // $(".zj_company_info_list_put input").eq(0).val(data['data']['code_sn']);
                    // $(".zj_company_info_list_put input").eq(1).val(data['data']['corporation'])
                    // $(".zj_company_info_list_put input").eq(2).val(data['data']['num'])
                    // $(".zj_company_info_list_put input").eq(3).val(data['data']['user_name'])
                    // $(".zj_company_info_list_put input").eq(4).val(data['data']['account_name'])
                    // $(".zj_company_info_list_put input").eq(5).val(data['data']['begin_time'])
                    // $(".zj_company_info_list_put input").eq(6).val(data['data']['end_time'])
                        html='<tr>\
                        <td>'+data['data']['code_sn']+'</td>\
                        <td>'+data['data']['corporation']+'</td>\
                        <td>'+data['data']['num']+'</td>\
                        <td>'+data['data']['user_name']+'</td>\
                        <td>'+data['data']['account_name']+'</td>\
                        <td>'+data['data']['begin_time']+'</td>\
                        <td>'+data['data']['end_time']+'</td>\
                        </tr>';
                    $(".zj_company_body_info").html(html);
                }else{
                    alert(data.msg);
                }
            }
        })
    }
    company_info_fn();
    var company_list={
        token: token

    }
    /*列表*/
    function company_list_show_fn(){
        $.ajax({
            type: "get",
            url: SERVER_URL + "/company/list",
            data:company_list,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.code==0){
                    if(data['data']['dataList'].length>0){
                        $(".zcj_gs_info_no_data_show_div").hide();
                        //$(".zcj_company_info_content_list").hide();
                    }else{
                        $(".zcj_gs_info_no_data_show_div").show();
                    }
                }else{
                    $(".zcj_gs_info_no_data_show_div").show();
                }

                var html='';
                if(data.code!=0){
                alert(data.msg);
                }else{
                    var ropat=0;
                    $.each(data['data']['dataList'],function(index,company_data){
                        ropat=repair(index+1);
                        if(company_data['is_cancel']==1){
                            html+='<tr> <td width="4%">'+ropat+'</td> '
                        }else{
                            html+='<tr class="grey"> <td width="4%"><span class="voidIcon">作废</span></td> '
                        }

                        html+='<td width="8%">'+company_data['name']+'</td> <td width="10%">'+company_data['tel']+'</td> <td width="11%">'+company_data['fax']+'</td> <td width="14%">'+company_data['email']+'</td> <td width="8%">'+company_data['account_bank']+'</td> <td width="15%">'+company_data['account_num']+'</td> <td width="12%">'+company_data['tax_no']+'</td> <td width="18%"> <button class="but_mix val_dialog zcj_company_check_info_btn" data-id="'+company_data['id']+'" name="company_look">查看</button>';
                        if(company_data['is_cancel']==1){
                            html+='<button class="but_mix val_dialog zcj_company_edit_info_btn" data-id="'+company_data['id']+'" name="company_new">编辑</button><button class="but_mix zcj_company_zf_info_btn" data-id="'+company_data['id']+'" name="">作废</button> </td></tr>'
                        }else{
                            html+='<button class="but_mix" style="color: #ccc;border-color: #ccc;" data-id="'+company_data['id']+'" name="">编辑</button> </td></tr>'
                        }


                    })
                    $(".zcj_company_info_content_list").html(html);
                }
                /*权限设置*/
                if(company_admin!=1){
                    /*信息查看*/
                    if($.inArray(gs_xq,power)>-1){
                        $(".zcj_company_check_info_btn").show();

                    }else{
                        $(".zcj_company_check_info_btn").hide();

                    }
                    /*信息编辑*/
                    if($.inArray(gs_add,power)>-1){
                        $(".zcj_company_edit_info_btn").show();

                    }else{
                        $(".zcj_company_edit_info_btn").hide();

                    }

                }


            },
            error:function(){
                alert("更新失败，请稍后再试");
            }
        });
    }
    company_list_show_fn();
    function changeImg(objImg)
    {
        var most = 82;        //设置最大宽度
        if(objImg.width > most)
        {
            var scaling = 1-(objImg.width-most)/objImg.width;
            //计算缩小比例
            objImg.width = objImg.width*scaling;
            objImg.height = objImg.height;            //img元素没有设置高度时将自动等比例缩小

            //objImg.height = objImg.height*scaling;    //img元素设置高度时需进行等比例缩小
        }

    }
    /*上传图片方法*/
    //var add_imgi = 1;
    function ajaxSubmit($el) {
        // SERVER_URL = 'http://192.168.0.167:9091/';
        //  var token = token;
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
                $(".img_warp li").remove();
                $el.parent().before('<li><input class="hide_input" type="file" id="upimgFile"/><img class="img_src" id="imgShow" src="'+getImgUrl(data.imgurl)+'"/><i class="del_img">-</i></li>');
                //$(".img_warp #imgShow_1").attr("src",getImgUrl(data.imgurl));
                // $(".hr_15_employee_add_face").attr("src", SERVER_URL + '/upload/commonImg/'+data.imgurl);
                $("#imgShow").data("src",data.imgurl);
                // add_imgi++;

                //console.log(data.imgurl);
                 //$("#imgShow_" + add_imgi + "").data("url",data.imgurl)
            },
            onProgress: function (e) {
                var per = Math.round(e.loaded * 100 / e.total);
                $('.hr_15_employee_add_face').css('width', per + '%')
            }
        });
        $el.upload("ajaxSubmit");
    }
    $(".tanceng .zcj_img_add_face_upload").die().live("change",function(){
        ajaxSubmit($(this));

        //changeImg($(".zcj_company_info_content .img_src"))
    });
    /*验证邮箱*/
    // $(".zcj_company_email").die().live("blur",function(){
    //     var ma=$(this).val();
    //     CheckMail(ma)
    // });
    /*验证手机号*/
    // $(".zcj_company_phone").die().live("blur",function(){
    //     var ma=$(this).val();
    //     checkContactNumber(ma)
    // });
    /*验证汉字*/
    // $("").die().live("blur",function(){
    //     var hz=$(this).val();
    //     chinese(hz)
    // });
    function edit_add_fn(){
        var company_info_xj= '.tanceng .zcj_new_create_company_info_tc_show ';
        // var industry_type=0;
        //var industry_type=0;
        $(".zcj_select_list_industry_ul li").die().live("click",function(){//请选择所属行业
            var industry_type=$(this).data('id');
            $("zcj_select_company_hy").data('id',industry_type)
        });
        //var invoice_limit_type=0;
        //var  invoice_limit_type=0;
        $(".zcj_select_list_price_show li").die().live("click",function(){//发票最大限额
            var invoice_limit_type=$(this).data('id');
            $("zcj_select_invoice_price").data('id',invoice_limit_type)
        });
        // if($(".tanceng .zcj_company_is_invoice_warning").is(":checked")){
        //     $(".tanceng .zcj_select_warning_num").attr("disabled",false).val('请输入下线预警数量');
        // }else{
        //     $(".tanceng .zcj_select_warning_num").attr("disabled",true).val('');
        // }
        // $(".tanceng .zcj_company_is_invoice_warning").die().live("click",function(){
        //     if($(this).is(":checked")){
        //         $(".tanceng .zcj_select_warning_num").attr("disabled",false).val('请输入下线预警数量');
        //
        //     }else{
        //         $(".tanceng .zcj_select_warning_num").attr("disabled",true).val('');
        //     }
        // });
        /*新建保存*/
        $(company_info_xj + '.zcj_save_company_info_btn').die().live('click',function(){
                var _this=this;
            var editid = $('.zcj_company_info_content .zcj_add_new_create_table').val();

            var imgurl=$('.zcj_company_info_content .img_warp #imgShow').data('src');

            // console.log('102');
            // console.log(imgurl);
            // console.log('102');
            var name;//请输入公司名称
            if($(company_info_xj + '.zcj_company_info_content .zcj_company_name').val()=='请输入公司名称'){
                name=''
            }else{
                name=$.trim($(company_info_xj + '.zcj_company_info_content .zcj_company_name').val());
            }

            var address;//请输入公司地址
            if($(company_info_xj + '.zcj_company_info_content .zcj_company_url').val()=='请输入公司地址'){
                address=''
            }else{
                address=$(company_info_xj + '.zcj_company_info_content .zcj_company_url').val();
            }
            var tel;//请输入电话
            if($(company_info_xj + '.zcj_company_info_content .zcj_company_phone').val()=='请输入电话'){
                tel=''
            }else{
                tel=$(company_info_xj + '.zcj_company_info_content .zcj_company_phone').val();
            }
            if(tel!=''){
                if(checkContactNumber(tel)==false){
                    return false;
                }
            }

            var fax;//请输入传真
            if($(company_info_xj + '.zcj_company_info_content .zcj_company_fax').val()=='请输入传真'){
                fax=''
            }else{
                fax=$(company_info_xj + '.zcj_company_info_content .zcj_company_fax').val();
            }
            isTel(fax);
            var email;//请输入邮箱
            if($(company_info_xj + '.zcj_company_info_content .zcj_company_email').val()=='请输入邮箱'){
                email=''
            }else{
                email=$(company_info_xj + '.zcj_company_info_content .zcj_company_email').val();
            }
            if(email!=''){
                if(CheckMail(email)==false){
                    return false;
                }
            }

            var weburl;//请输入公司网址
            if($(company_info_xj + '.zcj_company_info_content .zcj_company_weburl').val()=='请输入公司网址'){
                weburl=''
            }else{
                weburl=$(company_info_xj + '.zcj_company_info_content .zcj_company_weburl').val();
            }
            if(weburl!='') {
                if (checkUrl(weburl) == false) {
                    return false;
                }
            }
            var company_account_name;//请输入账户名称
            if($(company_info_xj + '.zcj_company_info_content .zcj_company_account_name').val()=='请输入账户名称'){
                company_account_name=''
            }else{
                company_account_name=$.trim($(company_info_xj + '.zcj_company_info_content .zcj_company_account_name').val());
            }
            var account_bank;//请输入开户银行
            if($(company_info_xj + '.zcj_company_info_content .zcj_company_account_bank').val()=='请输入开户银行'){
                account_bank=''
            }else{
                account_bank=$(company_info_xj + '.zcj_company_info_content .zcj_company_account_bank').val();
            }
            var account_num;//请输入银行账号
            if($(company_info_xj + '.zcj_company_info_content .zcj_company_account_num').val()=='请输入银行账号'){
                account_num=''
            }else{
                account_num=$(company_info_xj + '.zcj_company_info_content .zcj_company_account_num').val();
            }
            // var tax_no;//请输入税号
            // if($(company_info_xj + '.zcj_company_info_content .zcj_company_tax_no').val()=='请输入税号'){
            //     tax_no=''
            // }else{
            //     tax_no=$(company_info_xj + '.zcj_company_info_content .zcj_company_tax_no').val();
            // }
           /* 纳税人识别号 */
           var tax_no;
           if($(company_info_xj + '.zcj_company_info_content .zcj_company_tax_nsr_num').val()=='请输入纳税人识别号'){
               tax_no=''
           }else{
               tax_no=$(company_info_xj + '.zcj_company_info_content .zcj_company_tax_nsr_num').val();
           }
            if($.trim(tax_no) == ''){
                alert("请输入纳税人识别号 ！");
                return;
            }else if($.trim(tax_no) != ''){
                var addressCode = tax_no.substring(0,6);
                // 校验地址码
                var check = checkAddressCode(addressCode);
                if(!check) {
                    alert("请输入正确的纳税人识别号 (地址码)！");
                    return;
                }else{
                    // 校验组织机构代码
                    var orgCode = tax_no.substring(6,9);
                    check = orgcodevalidate(orgCode);
                    if(!check){
                        alert("请输入正确的纳税人识别号(组织机构代码) ！");
                        return;
                    }
                }
            }
           /*地址、电话*/
           var invoice_address;
           if($(company_info_xj + '.zcj_company_info_content .zcj_company_tax_adress_tel').val()=='请输入地址、电话'){
               invoice_address=''
           }else{
               invoice_address=$.trim($(company_info_xj + '.zcj_company_info_content .zcj_company_tax_adress_tel').val());
           }
            // if(invoice_address==''){
            //     alert('请输入地址、电话');
            //     return false;
            // }
            /*开户行及账号*/
            var invoice_account;
            if($(company_info_xj + '.zcj_company_info_content .zcj_company_tax_bank_zh').val()=='请输入开户行及账号'){
                invoice_account='';
            }else{
                invoice_account=$(company_info_xj + '.zcj_company_info_content .zcj_company_tax_bank_zh').val();
            }
            // if(invoice_account==''){
            //     alert('请输入开户行及账号');
            //     return false;
            // }
            var invoice_num;//请输入发票数量
            if($(company_info_xj + '.zcj_company_info_content .zcj_company_invoice_num').val()=='请输入发票数量'){
                invoice_num=''
            }else{
                invoice_num=$(company_info_xj + '.zcj_company_info_content .zcj_company_invoice_num').val();
            }

            var is_invoice;
            if($(".zcj_company_is_invoice_warning").is(':checked')){
                is_invoice=1;//是

            }else{
                is_invoice=2;//否
            }
            var invoice_warning_num;//下线预警数量
            if($(company_info_xj + '.zcj_company_info_content .zcj_select_warning_num').val()=='请输入下线预警数量'){
                invoice_warning_num=''
            }else{
                invoice_warning_num=$(company_info_xj + '.zcj_company_info_content .zcj_select_warning_num').val();
            }
            var industry_type=$(".zcj_select_company_hy").data('id');
            var invoice_limit_type=$(".zcj_select_invoice_price").data('id')
            if(name==''){
                alert('请输入公司名称');
                return false;
            }else if($(".zcj_select_company_hy").val()=='请选择所属行业' || $(".zcj_select_company_hy").val()==''){
                alert('请选择公司所属行业');
                return false;
            } else if(address==''){
                alert('请输入公司地址');
                return false;
            }else if(company_account_name==''){
                alert('请输入公司账户名称');
                return false;
            }else if(account_bank==''){
                alert('请输入公司开户银行');
                return false;
            }else if(account_num==''){
                alert('请输入公司银行账户');
                return false;
            }else if(tax_no==''){
                alert('请输入纳税人识别号');
                return false;
            }else if(invoice_address==''){
                alert('请输入地址、电话');
                return false;
            }else  if(invoice_account==''){
                alert('请输入开户行及账号');
                return false;
            }else if(invoice_num=='' || invoice_num<=0){
                alert('请输入发票数量');
                return false;
            }else if($(".zcj_select_invoice_price").val()=='请选择发票最大额' || $(".zcj_select_invoice_price").val()==''){
                alert('请选择发票最大额');
                return false;
            }else if(invoice_warning_num=='' || invoice_warning_num<=0){
                alert('请输入下线预警数量');
                return false;
            }
                $.ajax({
                    type: "post",
                    url: SERVER_URL + "/company/add",
                    data: {
                        token: token,
                        id:editid,
                        name: name,
                        imgurl: imgurl,
                        industry_type: industry_type,
                        address: address,
                        tel: tel,
                        fax: fax,
                        email: email,
                        weburl: weburl,
                        company_account_name: company_account_name,
                        /*  account_name: account_name,*/
                        account_bank: account_bank,
                        account_num: account_num,
                        invoice_num: invoice_num,
                        invoice_limit_type: invoice_limit_type,
                        is_invoice_warning: is_invoice,
                        invoice_warning_num: invoice_warning_num,
                        tax_no: tax_no,
                        invoice_account:invoice_account,
                        invoice_address:invoice_address


                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if(data.code==0){
                            alert(data.msg);
                            company_list_show_fn();
                                $(_this).parents('.zcj_new_create_company_info_tc_show').find('.dialog_close').click();
                        }else{
                            alert(data.msg)
                        }
                    },
                    error:function(){
                        alert("更新失败，请稍后再试");
                    }
                })



        });
    }

   /*新建公司信息*/
$(".zcj_create_new_company_info").on("click",function(){
    var company_info_xj = '.tanceng .zcj_new_create_company_info_tc_show ';
    $(".zcj_new_create_company_info_tc_show .dialog_h3").html('新建公司信息');
    setTimeout(function(){
        edit_add_fn();
    },100)


});





/*查看、编辑*/
$('.zcj_company_info_content_list').on('click','.zcj_company_check_info_btn',function () {
    var check_id=$(this).data('id');
    var check_info_xq='.tanceng .zcj_check_edit_company_info_display ';
    $.ajax({
        type: "get",
        url: SERVER_URL + "/company/infobyid",
        data: {
            token:token,
            id:check_id
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            //$(check_info_xq + "zcj_company_info_input_con input:eq(0)").val(data['data']['imgurl']);
            if(data['data']['imgurl']!=''){
                $(check_info_xq + ".zcj_company_img_info").html('<img onload="'+changeImg(this)+'" class="img_src" id="imgShow_1" src="'+getImgUrl(data['data']['imgurl'])+'">')
            }else{
                $(check_info_xq + ".zcj_company_img_info").html('<img onload="'+changeImg(this)+'" class="img_src" id="imgShow_1" src="static/images/hr_touxiang.png">')
            }

            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(0)").val(data['data']['name']);

            //$(check_info_xq + ".zcj_company_info_input_con .time_input:eq(1)").val(data['data']['industry_type']);

            if(data['data']['industry_type']==1){
                $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(1)").val('电子通信');

            }else if(data['data']['industry_type']==2){
                $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(1)").val('IT');

            }else if(data['data']['industry_type']==3){
                $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(1)").val('会计');

            }
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(2)").val(data['data']['address']);
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(3)").val(data['data']['tel']);
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(4)").val(data['data']['fax']);
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(5)").val(data['data']['email']);
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(6)").val(data['data']['weburl']);
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(7)").val(data['data']['company_account_name']);
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(8)").val(data['data']['account_bank']);
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(9)").val(data['data']['account_num']);
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(10)").val(data['data']['tax_no']);
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(11)").val(data['data']['invoice_address']);
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(12)").val(data['data']['invoice_account']);
            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(13)").val(data['data']['invoice_num']);

            if(data['data']['invoice_limit_type']==1){
                $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(14)").val('万元版');

            }else if(data['data']['invoice_limit_type']==2){
                $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(14)").val('十万元版');
            }else if(data['data']['invoice_limit_type']==3){
                $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(14)").val('百万元版');
            }
            if(data['data']['is_invoice_warning']==1){
                $(check_info_xq + ".zcj_company_info_input_con .type_checked_input").attr('checked',true);
            }else{
                $(check_info_xq + ".zcj_company_info_input_con .type_checked_input").attr('checked',false);
            }

            $(check_info_xq + ".zcj_company_info_input_con .time_input:eq(15)").val(data['data']['invoice_warning_num']);

        },
        error:function(){
            alert("更新失败，请稍后再试");
        }
    })
});
/*编辑*/
$(".zcj_company_info_content_list").on("click",".zcj_company_edit_info_btn",function(){
    var company_info_xj = '.tanceng .zcj_new_create_company_info_tc_show ';
    $(".zcj_new_create_company_info_tc_show .dialog_h3").html('编辑公司信息')
    $(".tanceng .zcj_company_info_content input").css("color","#333")
    var edit_id = $(this).data('id');


    $('.zcj_add_new_create_table').val(edit_id);
    $.ajax({
        type: "get",
        url: SERVER_URL + "/company/infobyid",
        data: {
            token: token,
            id: edit_id
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data['data']['imgurl']!=''){
                $(".tanceng .zcj_company_info_content .zcj_img_add_face_upload").parent().before('<li><input class="hide_input" type="file" id="upimgFile_1"><img class="img_src" id="imgShow_1" src="'+getImgUrl(data['data']['imgurl'])+'"><i class="del_img">-</i></li>');

            }
            $(company_info_xj + ".zcj_company_info_content .zcj_company_name").val(data['data']['name']);

           // $(company_info_xj + ".zcj_company_info_content .zcj_select_company_hy").val(data['data']['industry_type']);
            var industry_type;

            if(data['data']['industry_type']==1){
                $(company_info_xj + ".zcj_company_info_content .zcj_select_company_hy").val('电子通信');
                industry_type=1;
            }else if(data['data']['industry_type']==2){
                $(company_info_xj + ".zcj_company_info_content .zcj_select_company_hy").val('IT');
                industry_type=2;
            }else if(data['data']['industry_type']==3){
                $(company_info_xj + ".zcj_company_info_content .zcj_select_company_hy").val('会计');
                industry_type=3;
            }
            $(company_info_xj + ".zcj_company_info_content .zcj_company_url").val(data['data']['address']);
            $(company_info_xj + ".zcj_company_info_content .zcj_company_phone").val(data['data']['tel']);
            $(company_info_xj + ".zcj_company_info_content .zcj_company_fax").val(data['data']['fax']);
            $(company_info_xj + ".zcj_company_info_content .zcj_company_email").val(data['data']['email']);
            $(company_info_xj + ".zcj_company_info_content .zcj_company_weburl").val(data['data']['weburl']);
            $(company_info_xj + ".zcj_company_info_content .zcj_company_account_name").val(data['data']['company_account_name']);
            $(company_info_xj + ".zcj_company_info_content .zcj_company_account_bank").val(data['data']['account_bank']);
            $(company_info_xj + ".zcj_company_info_content .zcj_company_account_num").val(data['data']['account_num']);
            $(company_info_xj + ".zcj_company_info_content .zcj_company_tax_nsr_num").val(data['data']['tax_no']);
            $(company_info_xj + ".zcj_company_info_content .zcj_company_tax_adress_tel").val(data['data']['invoice_address']);
            $(company_info_xj + ".zcj_company_info_content .zcj_company_tax_bank_zh").val(data['data']['invoice_account']);
            $(company_info_xj + ".zcj_company_info_content .zcj_company_invoice_num").val(data['data']['invoice_num']);
            var invoice_limit_type;
            if(data['data']['invoice_limit_type']==1){
                $(company_info_xj + ".zcj_company_info_content .zcj_select_invoice_price").val("万元版");
                 invoice_limit_type=1;
            }else if(data['data']['invoice_limit_type']==2){
                $(company_info_xj + ".zcj_company_info_content .zcj_select_invoice_price").val("十万元版");
                invoice_limit_type=2;
            }else if(data['data']['invoice_limit_type']==3){
                $(company_info_xj + ".zcj_company_info_content .zcj_select_invoice_price").val("百万元版");
                invoice_limit_type=3;
            }

            if(data['data']['is_invoice_warning']==1){
                $(company_info_xj + ".zcj_company_info_content .zcj_company_is_invoice_warning").attr('checked',true);
            }else{
                $(company_info_xj + ".zcj_company_info_content .zcj_company_is_invoice_warning").attr('checked',false);
            }

            $(company_info_xj + ".zcj_company_info_content .zcj_select_warning_num").val(data['data']['invoice_warning_num']);

            $(".zcj_select_company_hy").data('id',industry_type);
            $(".zcj_select_invoice_price").data('id',invoice_limit_type)
        },
        error:function(){
            alert("更新失败，请稍后再试");
        }
    })

    edit_add_fn();
});
/*作废*/
$(".zcj_company_info_content_list").on("click",".zcj_company_zf_info_btn",function () {
        var zf_id=$(this).data('id');
    $.ajax({
        type: "post",
        url: SERVER_URL + "/company/cancel",
        data: {
            token: token,
            id: zf_id,
            is_cancel: 2
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data.code==0){
                // alert('已作废');
               /* $(this).parents('tr').*/
                company_list_show_fn();
            }else{
                alert(data.msg);
            }

        }
    })
});



});
