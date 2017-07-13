var app = angular.module("app.alter",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/alter",{
		templateUrl:"loads/alter.html",
		controller:"alterController"
	});
});

app.controller("alterController",function($scope,$http,modalService){
	$scope.msg = "密码修改";
	//表单中双向绑定的对象
	$scope.newUser;
	
	})

