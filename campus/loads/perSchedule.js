var app = angular.module("app.perSchedule",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/perSchedule",{
		templateUrl:"loads/perSchedule.html",
		controller:"perScheduleController"
	});
});

app.controller("perScheduleController",function($scope,$http,modalService){
	$scope.msg = "个人课表";
	//表单中双向绑定的对象
	$scope.newUser;
	
	})

