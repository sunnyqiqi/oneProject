//导航切换
var guide_arr1=['guide_xh_grey1.png','guide_xh_grey2.png','guide_xh_grey3.png','guide_xh_grey4.png','guide_xh_grey5.png','guide_xh_grey6.png','guide_xh_grey7.png'];
var guide_arr2=['guide_xh_white1.png','guide_xh_white2.png','guide_xh_white3.png','guide_xh_white4.png','guide_xh_white5.png','guide_xh_white6.png','guide_xh_white7.png'];
$('.guide_main_ul ul li').live('click',function(){
    $(this).closest('.guide_main_ul').siblings('.guide_content').children('.guide_vend_content').addClass('none').eq($(this).index()).removeClass('none');
    $('.guide_main_ul ul li').css({'background':'','border-color':'','color':''}).eq($(this).index()).css({'background':'#32a0f6','borderColor':'#32a0f6','color':'#fff'});
    for(var i=0;i<guide_arr1.length;i++){
        $('.guide_main_ul ul li').eq(i).children('i').css('background-image','url(static/guide/images/'+guide_arr1[i]+')');
    }
    $(this).children('i').css('background-image','url(static/guide/images/'+guide_arr2[$(this).index()]+')');

});
$('.guide_main_ul ul li').eq(0).trigger('click');
//公共切换
$('a[class^="left_button_"]').live('click', function(){
    console.log($(this).attr('class'));
    $('#' + $(this).attr('class')).trigger('click');
});
//出库单切换
$('.guide_crk_btn').live('click',function(){
    $('#left_button_71').trigger('click');
    setTimeout(function(){
        $('.tabtitle li[name="crk_ck_main"]').eq(1).trigger('click');
    },200);
});
$('.guide_crk_btn1').live('click',function(){
    $('#left_button_71').trigger('click');
    setTimeout(function(){
        $('.tabtitle li[name="crk_ck_main"]').eq(2).trigger('click');
    },200);
});
//入库单切换
$('.guide_crk_btn3').live('click',function(){
    $('#left_button_69').trigger('click');
    setTimeout(function(){
        $('.tabtitle li[name="crk_rk_main"]').eq(1).trigger('click');
    },200);
});
//售后分配
$('.guide_xs_btn1').live('click',function(){
    $('#left_button_108').trigger('click');
    setTimeout(function(){
        $('.tabtitle li[name="xs_shd_mian"]').eq(2).trigger('click');
    },200);
});
//我执行的
$('.guide_xs_btn2').live('click',function(){
    $('#left_button_108').trigger('click');
    setTimeout(function(){
        $('.tabtitle li[name="xs_shd_mian"]').eq(1).trigger('click');
    },200);
});
//财务-已收款
$('.guide_fin_btn1').live('click',function(){
    $('#left_button_84').trigger('click');
    setTimeout(function(){
        $('.tabtitle li[name="finance_gather_account_gather"]').eq(1).trigger('click');
    },200);
});
//财务-已付款
$('.guide_fin_btn2').live('click',function(){
    $('#left_button_85').trigger('click');
    setTimeout(function(){
        $('.tabtitle li[name="finance_payment_account_gather"]').eq(1).trigger('click');
    },200);
});
//财务-已付票
$('.guide_fin_btn3').live('click',function(){
    $('#left_button_86').trigger('click');
    setTimeout(function(){
        $('.tabtitle li[name="finance_pay_rent_a"]').eq(1).trigger('click');
    },200);
});
//财务-已收票
$('.guide_fin_btn4').live('click',function(){
    $('#left_button_96').trigger('click');
    setTimeout(function(){
        $('.tabtitle li[name="finance_pay_refund_a"]').eq(1).trigger('click');
    },200);
});



//提示信息
$('.guide_table_aaa .guide_table_tr_one td a').live('mouseenter',function(){
    //alert(111);
    $(this).siblings(".guide_contMsgBox").show();
})
$(".guide_table_aaa .guide_table_tr_one td").live("mouseleave",function () {
    $(this).children(".guide_contMsgBox").hide();
});
//$('.left_button_125').trigger('click');


