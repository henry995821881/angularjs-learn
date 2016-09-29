<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<!-- <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script> -->
<script type="text/javascript" src="js/angularjs.js"></script>
<link rel="stylesheet" href="bootstrap-3.3.0-dist/dist/css/bootstrap.min.css">
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript">
	var goodsList = [ {
		id : 1,
		name : "tomato",
		price : 4.5,
		number : 10
	}, {
		id : 2,
		name : "bananer",
		price : 5.5,
		number : 15
	} ];
</script>
</head>
<body ng-app="myApp" ng-controller="myCtrl">


	<div class="container">

		<div class="row">

			<div class="col-md-8">

				<div class="panel panel-default">
					<div class="panel-heading">
						<h3>List</h3>
					</div>
					<table class="table">
						<tr ng-repeat="goods in goodsList">
							<td>{{goods.id}}</td>
							<td>{{goods.name}}</td>
							<td>{{goods.price}}</td>
							<td>{{goods.number}}</td>
							<td>
								<a href="javascript:void(0)" ng-click="del(goods.id);" class="btn btn-default">delete</a>
							</td>
							<td>
								<a href="javascript:void(0)" ng-click="edit($event,goods.id,goods.name,goods.price,goods.number)" class="btn btn-default">edit</a>
							</td>
						</tr>





					</table>
				</div>
			</div>
			<div class="col-md-4">


				<div id="editDiv" >
					<input type="text" ng-model="tempGoods.id" readonly="readonly">
					<br>
					<input type="text" ng-model="tempGoods.name" readonly="readonly">
					<br>
					<input type="text" ng-model="tempGoods.price">
					<br>
					<input type="text" ng-model="tempGoods.number">
					<br>
					<a href="javascript:void(0)" class="btn btn-default" ng-click="confirm($event);">ok</a>
					<a href="javascript:void(0)" class="btn btn-default" ng-click="cancel();">cancel</a>
					
				</div>


			</div>
		</div>
	</div>

	<script type="text/javascript">
	$("#editDiv").hide();
		
		var app = angular.module("myApp", []);
		app.controller("myCtrl",function($scope, $http) {

							$scope.goodsList = goodsList;

							$scope.cancel = function(){
								
								$("#editDiv").hide();	
								$scope.tempGoods = null;
								
							}
							//
							$scope.confirm = function($event) {

								$http({
									method : 'POST',
									url : "editGoods.do",
									data : $.param($scope.tempGoods),
									// $.param ->use jquery change {name:name,p:p} to name=name&p=p;
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded'
									}
								// set the headers so angular passing info as form data (not request payload)
								}).success(function(data) {

									//result
									if(data){
										
										for(goods in goodsList){
											
											if(goods.id ==$scope.tempGoods.id){
												goods.price = $scope.tempGoods.price;
												goods.number = $scope.tempGoods.number;
												$("#editDiv").hide();		
												break;
												
											}
										}
										
										
									}

								});

								
							}

							//delete
							$scope.del = function(id) {
								var i;
								for (i = 0; i < goodsList.length; i++) {
									if (id == goodsList[i].id) {
										goodsList.splice(i, 1);
										break;
									}
								}
							}
							//edit
							$scope.edit = function($event, id, name, price,
									number) {

								

								$scope.tempGoods = {
									"id" : id,
									"name" : name,
									"price" : price,
									"number" : number
								};
								
								$("#editDiv").show();
								
								
								
								//string ->jquery->dom
								/* 
							 	var tr = $event.target.parentNode;
								var string = '<tr>'
										+ '<td>'
										+ '<div >'
										+ '<input type="text" ng-model="tempGoods.id" readonly="readonly">'
										+ '<br>'
										+ '<input type="text" ng-model="tempGoods.name" readonly="readonly">'
										+ '<br>'
										+ '<input type="text" ng-model="tempGoods.price" >'
										+ '<br>'
										+ '<input type="text" ng-model="tempGoods.number">'
										+ '<br>'
										+ '<a href="javascript:void(0)" ng-click="ok($event);cancel($event);">ok</a>'
										+ '<br>'
										+ '<a href="javascript:void(0)" ng-click="cancel($event);">cancel</a>'
										+ '</div>' + '</td>' + '</tr>';
								var tr_ = $(string).get(0);
								tr.parentNode.insertBefore(tr_, tr);  */

							}

						});
	</script>
</body>
</html>