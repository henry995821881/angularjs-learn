<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>

<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">
<script type="text/javascript">
	var items = [ {
		id : 1,
		name : "good1",
		price : 10.1
	}, {
		id : 2,
		name : "good2",
		price : 6
	}, {
		id : 3,
		name : "good3",
		price :7
	}, {
		id : 4,
		name : "good4",
		price : 23
	}, {
		id : 5,
		name : "good5",
		price : 45
	}, {
		id : 6,
		name : "good6",
		price : 12
	}, {
		id : 7,
		name : "good7",
		price : 23
	}, {
		id : 8,
		name : "good8",
		price : 89
	}, {
		id : 9,
		name : "good9",
		price : 23
	} ];

	var cart = {};

</script>
<body>
	<div class="container" ng-app="myApp" ng-controller="myController">

		<div class="row">
			<div class="col-md-7">

				<ul>
					<li ng-repeat="item in items">
						<div>
							id:{{item.id}}
							<br>
							name:{{item.name}}
							<br>
							price:{{item.price}}
							<br>
							<a class="btn btn-default" href="javascript:void(0)" ng-click="buyAction($event,item.id,item.name,item.price)">buy</a>
						</div>
					</li>
				</ul>




			</div>
			<div class="col-md-5 ">


				<ul>
					<li ng-repeat="x in cart">
						<div>
							name:{{x.name}}&nbsp;price:{{x.price}}<br>
							
							<a href="javascript:void(0)" class="btn btn-default" ng-click="reduce($evnet,x.id,x.num);">-</a>
							<input type="text" ng-change="change(this,x.id)" size="2" ng-model="x.num">
							<a href="javascript:void(0)" ng-click="x.num=x.num+1;add($event,x.price)" class="btn btn-default">+</a>
							&nbsp;
							<a href="javascript:void(0)" ng-click="del($event,x.id);" class="btn btn-default">delete</a>

						</div>
					</li>
				</ul>

				<div >total:{{total}}</div>

			</div>

		</div>

	</div>

	<script>
		function getTotal() {
			var total = 0;
			for (k in cart) {

				if (cart[k]) {

					if(typeof cart[k].num =="number")
					total += cart[k].num * cart[k].price;
				}
			}

			return total;
		}

		var app = angular.module("myApp", []);
		app.controller("myController", function($scope) {

			$scope.items = items;
			$scope.cart = cart;
			$scope.total = 0;

			

			//buy
			$scope.buyAction = function($event, id, name, price) {

				if (cart[id]) {

					cart[id].num++;

				} else {

					cart[id] = {
						"num" : 1,
						"price" : price,
						"name" : name,
						"id" : id
					};

				}
				//total +++
				$scope.total += price;

			}
			//reduce
			$scope.reduce = function($event, id,num) {
				 if((num -1) < 0){
					 
					 alert("num can not lt 0");
					
					return; 
				 }else{
					 cart[id].num --;
				$scope.total -= cart[id].price;
			
				 } 
			}

			//add
			$scope.add = function($event, price) {
				$scope.total += price;
			}

			//change
			$scope.change = function(obj, id) {

				if (cart[id]) {
					
					
					if(obj.value!=""){
						
					cart[id].num = obj.value;
						
					}

				}

				$scope.total = getTotal();
			}
			//del
			$scope.del =function($event,id){
				
			   delete	cart[id];
			    var li =$event.target.parentNode.parentNode;
				li.parentNode.removeChild(li);
				
				$scope.total = getTotal();
			}

		});
	</script>

</body>
</html>