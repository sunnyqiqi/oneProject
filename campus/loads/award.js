var app = angular.module("app.award",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/award",{
		templateUrl:"loads/award.html",
		controller:"awardController"
	});
});

app.controller("awardController",function($scope,$http,modalService){
	$scope.msg = "奖励";
	//表单中双向绑定的对象
	$scope.newUser;
	
//-----------------学生相关功能对象----------------
	$scope.data = {
		award : $scope.$parent.awardData.award,//存储学生对象的数组
		modalTitle:"",
		option :"", //记录当前操作add upd
		search:{}, //用于接受用户的请求 {key:"name",val:"男"}
		criteria:{},//模板对象 {name:"男"}
		//显示添加学生信息的窗口 
		showAddModal : function(){
			this.option = "add";
			$scope.newUser = null;
			this.modalTitle = "添加学生信息";
			modalService.open("stuModal");
		},
		//添加学生信息
		addStu:function(){
			//1.将表单中的学生信息保存到students
			var stu = new Student(
				$scope.newUser.name,
				$scope.newUser.gender,
				$scope.newUser.award,
				$scope.newUser.punishment
			);
			$scope.data.award.push(stu);
			//清空输入框的内容
			$scope.newUser = null;
			//2.关闭模态框
			modalService.close("stuModal");
		},
		delStu: function(){
		    var b1 = this.award.some(function(item){
				return item.checked == true;
			});
			if(b1){
				if(window.confirm("确定吗？")){
					console.log(this);
					this.award = this.award.filter(function(item){
						return item.checked != true;
					});
				}	
			}else{
				alert("请选中您要删除的学生");
			}
		},
		//点击修改按钮激发，显示模态框
		showUpdModal:function(){
			this.option = "upd";
			var stu = this.award.filter(function(item){
				return item.checked == true;
			})[0];
			//判断是否选中了元素
			if(stu){
				$scope.newUser = stu; //双向数据绑定
				this.modalTitle = "修改"+stu.name+"信息";
				modalService.open("stuModal");
			}else{
				alert("请选中要修改的学生");
			}
		},
		updStu : function(){
			modalService.close("stuModal");
		},
		//搜索学生
		searchStu:function(){
			// 改变criteria的值
			//当key和val都有值的情况下再筛选
			this.criteria = {};
			if(this.search.key && this.search.val){
				this.criteria[this.search.key] 
				  = this.search.val;
			}else{
				this.criteria = {};
			}
		}
		
	}
//------------end-----------
	var id = 1000;
	//构造器
	function Student(name,gender,award,punishment){
		this.id = id;
		this.name = name;
		this.gender = gender;
		this.award = award;
		this.punishment = punishment;
	}
});

//服务的创建，工厂模式
app.factory("modalService",function(){
	var modal = document.getElementById("stuModal");
	modal = angular.element(modal);
	return {
		open:function(){
			modal.modal("show");
		},
		close:function(){
			modal.modal("hide");
		}
	}
});




