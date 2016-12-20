//地理api
if(navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(function (p) {
            var latitude = p.coords.latitude//纬度
            var longitude = p.coords.longitude;
            createmap(latitude, longitude);

        }, function (e) {//错误信息
            var aa = e.code + "\n" + e.message;
            alert(aa);
        }
    );
}
function createmap(a,b)
{
    var map = new BMap.Map("aaa");
    var point = new BMap.Point(b, a);
    map.centerAndZoom(point, 20);//设置地图的中心点和坐标
    Window.map = map;//将map变量存储在全局

}