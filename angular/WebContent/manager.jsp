<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>

<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript">
	
</script>
<body>
	<div class="container" ng-app="myApp" ng-controller="myController">


		<!-- <div class="panel panel-default"> -->
		<div class="panel panel-primary">
			<div class="panel-heading">
			<!-- panel-heading -->
				<h3>add goods</h3>
			</div>
<!-- panel-body -->
			<div class="panel-body">

				<div class="row">
					<div class="col-md-10">

						<form class="form-horizontal">

							<div class="form-group">
								<div class="col-md-2">
									<label class="control-label">name:</label>
								</div>
								<div class="col-md-7 col-md-offset-1">
									<input name="name" type="text" ng-model="goods.name">
								</div>
							</div>
							<div class="form-group">

								<div class="col-md-2">
									<label class="control-label">price:</label>
								</div>
								<div class="col-md-7 col-md-offset-1">
									<input type="text" name="price" ng-model="goods.price">
								</div>
							</div>
							<div class="form-group">

								<div class="col-md-2">
									<label class="control-label">number:</label>
								</div>
								<div class="col-md-7 col-md-offset-1">
									<input type="text" name="number" ng-model="goods.number">
								</div>
							</div>
							<div class="form-group">

								<div class="col-md-2">
									<a href="javascript:void(0)" ng-click="formPost();" class="btn btn-default">post</a>
								</div>
								<div class="col-md-2">
									<a href="javascript:void(0)" ng-click="formReset($event);" class="btn btn-default">reset</a>
								</div>
							</div>
						</form>
					</div>

				</div>

			</div>
		</div>
		{{goods}}
	</div>

	<script>
		var app = angular.module("myApp", []);
		app.controller("myController", function($scope, $http) {

			$scope.goods = {};

			//form post
			$scope.formPost = function() {

				$http({
					method : 'POST',
					url : "Manager",
					data : $.param($scope.goods),
					// $.param ->use jquery change {name:name,p:p} to name=name&p=p;
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				// set the headers so angular passing info as form data (not request payload)
				}).success(function(data) {

					//result

				});

			}
			//form reset
			$scope.formReset = function($event) {
				var a = $event.target;
				//alert($.param($scope.goods))
				$scope.goods = {};
			}

			//
		});
	</script>

</body>
</html>