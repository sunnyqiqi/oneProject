//        打印
$(".finance_printBut").live("click",function () {
    $(this).parents(".finance_print").jqprint({
        debug: false,
        importCSS: true,
        printContainer: true,
        operaSupport: false
    });
//            setTimeout(function(){$('#main-container #plugin').attr('src', 'sdfsfsd')},6000)
});

/*财务中展开收起*/
//展开/收起
$(".finance_khyfqp_sqtj").die("click").live("click",function(){
//            alert($(this).text());
    if($(this).text()=="收起统计"){
//                alert(1);
        $(this).html("展开统计");
    }else{
        $(this).html("收起统计");
    }
    $(this).parent().parent().next(".finance_khyfqp_sqtj1").slideToggle(100);
});

$(".finance_khyfqp_sqtj_ass").die("click").live("click",function(){
//            alert($(this).text());
    if($(this).text()=="收起统计"){
//                alert(1);
        $(this).html("展开统计");
        $('.finance_khyfqp_sqtj2_ss').css('border-top','1px solid #e6e6e6');
    }else{
        $(this).html("收起统计");
        $('.finance_khyfqp_sqtj2_ss').css('border-top','none');
    }
    $(this).parent().parent().next(".finance_khyfqp_sqtj2_ss").children('.finance_khyfqp_sqtj2').slideToggle(100);
});



//hover，感叹号提示信息
$(".finance_pay_rent_khysqk").live("mouseenter",function () {
    //alert(1);
    $(this).parent().next(".work_vent_client_contMsgBox").show();
});
$(".finance_khysqk_kuanxiang").live("mouseleave",function () {
    $(this).children(".work_vent_client_contMsgBox").hide();
});





//应收欠款-滑动显示
$(".finance_khysqk1").live("mouseenter",function () {
    //alert(1);
    $(this).siblings(".vent_client_contMsgBox").show();
});
$(".cw_td").live("mouseleave",function () {
    $(this).children(".vent_client_contMsgBox").hide();
});



//td中感叹号提示(列表中)
$(".finance_khysqk1").live("mouseenter",function () {
    //alert(1);
    $(this).siblings(".work_vent_client_contMsgBox").show();
});
$(".cw_td").live("mouseleave",function () {
    $(this).children(".work_vent_client_contMsgBox").hide();
});

/*展开统计与收起统计*/
$('.finance_account_tabtitle li').live('click',function(){
   if($(this).index() == 1){
       $(this).parents('.work_tabSp').siblings('.finance_khysqk_xj').hide();
       $('.finance_khyfqp_sqtj1').hide();
       $(this).parents('.finance_title').css('border-bottom','none');
   }else {
       $(this).parents('.work_tabSp').siblings('.finance_khysqk_xj').show();
       $('.finance_khyfqp_sqtj1').show();
       $(this).parents('.finance_title').css('border-bottom','1px solid #e6e6e6');
       $('.finance_khyfqp_sqtj').html("收起统计");
   };
});

/*展开统计与隐藏统计*/
$('.finance_account_tabtitlea li').live('click',function(){
    if($(this).index() ==1){
        $(this).parents('.work_tabSp').siblings('.finance_khysqk_xj').hide();
        $('.finance_khyfqp_sqtj2').hide();
        $('.finance_khyfqp_sqtj2_ss').css('border-top','none');
    }else {
        $(this).parents('.work_tabSp').siblings('.finance_khysqk_xj').show();
        $('.finance_khyfqp_sqtj2').show();
        $('.finance_khyfqp_sqtj_ass').html("收起统计");
        $('.finance_khyfqp_sqtj2_ss').css('border-top','none');
    };
});



//    //图表/列表 切换展示
//$(".taba").die("click").live("click",function(){
////            alert($(this).text());
//    if($(this).text()=="列表"){
////                alert(1);
//        $(this).parent().parent().siblings(".finance_three_a").show();
//    }else{
//        $(this).parent().parent().siblings(".finance_three_a").hide();
//    }
//});
//
//
//
//$(function () {
//    $('.finance_tb_a').live('click', function(){
//        $('#main_c').highcharts({
//            chart: {
//                type: 'column'
//            },
//            title: {
//                text: '应付供应商欠款排行',
//                margin:80,
//                y:10
//            },
//            xAxis: {
//                categories: [
//                    '盛唐酒家',
//                    'Coffe IS Key',
//                    '百家饭店',
//                    '九曲酒店',
//                    '小张烟酒',
//                    '七里香小馆',
//                    '阿是酒吧',
//                    '零售客户',
//                    '摆渡酒家',
//                    '00',
//                    '线上临时客户',
//                    '九制梅店',
//                    '里蒙KTV'
//                ],
//                crosshair: true
//            },
//            yAxis: {
//                min: 0,
//                title: {
//                    text: '金额 (元)'
//                },
//                labels:{
//                    formatter:function(){
//                        return this.value
//                    }
//                }
//            },
//            tooltip: {
//                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//                '<td style="padding:0"><b>{point.y:.1f} 元</b></td></tr>',
//                footerFormat: '</table>',
//                shared: false,
//                useHTML: true
//            },
//            plotOptions: {
//                column: {
//                    pointPadding: 0.2,
//                    borderWidth: 0
//                },
//                series:{
//                    animation:{
//                        duration:800
//                    }
//                }
//            },
//            series: [{
//                name: '应付欠款',
//                data: [3000,27254,25999,10000,5000,5000,3430,3200,0,0,0,0,0],
//                color: '#32a0f6'
//            }],
//        });
//        $("#main_c .highcharts-container").css("width",$("#main_c").width());
//        $("#main_c .highcharts-container svg").attr("width",$("#main_c").width());
//    });
//});


