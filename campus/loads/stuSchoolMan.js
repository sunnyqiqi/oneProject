var app = angular.module("app.stuSchoolMan",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/stuSchoolMan",{
		templateUrl:"loads/stuSchoolMan.html",
		controller:"stuSchoolManController"
	});
});

app.controller("stuSchoolManController",function($scope,$http,modalService){
	$scope.msg = "学生在校信息";
	//表单中双向绑定的对象
	$scope.newUser;
	
//-----------------学生相关功能对象----------------
	$scope.data = {
		stuSchool : $scope.$parent.schoolData.stuSchool,//存储学生对象的数组
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
			console.log(1);
			var stu = new Student(
				this.newUser.name,
				this.newUser.pepartment,
				this.newUser.major,
				this.newUser.teacher,
				this.newUser.position
			);
			
			$scope.schoolData.stuSchool.push(stu);
			console.log(1);
			//清空输入框的内容
			$scope.newUser = null;
			//2.关闭模态框
			modalService.close("stuModal");
		},
		delStu: function(){
		    var b1 = this.stuSchool.some(function(item){
				return item.checked == true;
			});
			if(b1){
				if(window.confirm("确定吗？")){
					this.stuSchool = this.stuSchool.filter(function(item){
						return item.checked != true;
					});
				}	
			}else{
				alert("请选中您要删除的学生");
			}
		},
		//点击修改按钮激发，显示模态框
		showUpdModal : function(){
			this.option="upd";
			var stu = this.stuSchool.filter(function(item){
				return item.checked == true;
			})[0];
			if(stu){
				this.newUser = stu;
				this.modalTitle = "修改"+stu.name+"信息";
				modalService.open("stuModal");
			}
		},
		updStu : function(){
			modalService.close("stuModal");
		},
		//搜索学生
		searchStu:function(){
			console.log(1);
			
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
	function Student(name,pepartment,major,teacher,position){
		this.id = ++id;
		this.name = name;
		this.pepartment = pepartment;
		this.major = major;
		this.teacher = teacher;
		this.position = position;
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


