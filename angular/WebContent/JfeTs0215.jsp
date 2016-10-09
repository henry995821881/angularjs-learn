<!DOCTYPE HTML>
<%@ page pageEncoding="UTF-8"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/sys.tld" prefix="sys"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
<head>
<script type="text/javascript" src="jfe/js/ajs.js"></script>
 <%@include file="/jfe/common/JfeComHeader.jsp"%> 
<script type="text/javascript">



	function checkValue(obj) {

		if (trim(obj) == "") {
			alert("相手先コードを入力してください。");
			return false;
		}

		var reg = /^[0-9a-zA-Z]+$/g;
		if (!reg.test(obj)) {

			alert("相手先コードを半角英数字で入力してください。");
			return false;
		}
		return true;
	}

	var flag;
	function setMaitesaki(maitesaki, type) {

		var message = '';
		switch (type) {
		case 'update':
			if (!checkValue(maitesaki.aitesakiCd))
				return;
			message = "更新してもよろしいですか。";
			break;
		case 'add':
			if (!checkValue(maitesaki.aitesakiCd))
				return;
			message = "追加してもよろしいですか。";
			break;
		case 'delete':
			message = "削除してもよろしいですか。";
			break;
		default:
			break;
		}

		if (confirm(message)) {

			var url = "<html:rewrite page='/jfeTs0212.do'/>";

			param = "&type=" + type;//delete,update,add
			param += "&doMaitesaki=true";
			param += "&kensinkikanCd=" + maitesaki.kikanCd;
			param += "&aitesakiCd=" + maitesaki.aitesakiCd;

			new Ajax.Request(url, {
				asynchronous : false,
				parameters : param,
				onComplete : function(result) {
					//
					flag = true;

				},
				onException : function(ajax, exception) {
					// alert(exception.message);
					flag = false;

				}
			});

		}

		return flag;
	}
</script>

</head>
<body class="noFrameBody">

	<div id="header">
 <%@include file="JfeTs0200.jsp"%> 
	</div>
	<p>相手先一覧</p>
	<br>
	<div id="content" ng-app="app" ng-controller="ctrl">
		<table class="tblBase" style="width: 590px;">
			<tr>
				<td class="tblIndex" width="22%">健診機関コード</td>
				<td class="tblIndex" width="34%">健診機関名称</td>
				<td class="tblIndex" width="22%">相手先コード</td>
				<td class="tblIndex" width="22%"></td>
			</tr>
		</table>
		<div style="overflow: auto; width: 607px; height: 260px;">

			<table class="tblBase" style="width: 590px;">
<!-- 				<tr ng-repeat="maitesaki in  maitesakiList | filter:test"> -->
                    <tr ng-repeat="maitesaki in  maitesakiList"> 
					<td class="tblCel2L" width="22%">
						{{maitesaki.kikanCd }}
						<input type="hidden" value="{{maitesaki.kikanCd}}" name="kikanCd">
					</td>
					<td class="tblCel2L" width="32%">{{maitesaki.kikanNm}}</td>
					<td class="tblCel2L" width="22%">
						<input type="text" ng-model="maitesaki.aitesakiCd" size="10" maxlength="4">
					</td>
					<td class="tblCel2C" width="22%">

						<div ng-show="maitesaki.opt">
							<button class="nolbutton" ng-click="update(maitesaki)">[更新]</button>
							<button class="nolbutton" ng-click="del(maitesaki)">[削除]</button>
						</div>


						<div ng-hide="maitesaki.opt">
							<button class="nolbutton" ng-click="add(maitesaki)">[追加]</button>
						</div>
						<!-- <span opt></span> -->
					</td>
				</tr>

				<tr ng-if="maitesakiList.length ==0">
					<td class="tblCel2L">
						<bean:message key="jfe.message.error.nodata2" />
					</td>
				</tr>
			</table>
		</div>


		<script type="text/javascript">
		

			var app =angular.module("app", []);
		
	
					app.controller(
							"ctrl",
							function($scope) {

							var j = '${maitesakiListjson}';//必須单引号
								$scope.maitesakiList = eval(j);

								$scope.a="b";
								
								$scope.test ="0001";

								for (e in $scope.maitesakiList) {

									if ($scope.maitesakiList[e].kensinkikanCd != null
											&& $scope.maitesakiList[e].kensinkikanCd != '') {

										$scope.maitesakiList[e].opt = true;
									} else {

										$scope.maitesakiList[e].opt = false;
									}
								}

								$scope.update = function(maitesaki) {

									setMaitesaki(maitesaki, "update");

								}

								$scope.del = function(maitesaki) {

									if (setMaitesaki(maitesaki, "delete")) {

										maitesaki.kensinkikanCd = '';
										maitesaki.aitesakiCd = '';
										maitesaki.opt = false;
									}
								}

								$scope.add = function(maitesaki) {

									if (setMaitesaki(maitesaki, "add")) {

										maitesaki.kensinkikanCd = maitesaki.kikanCd;
										maitesaki.opt = true;
									}
								}

							});
					
					app.directive("opt",function(){
					
						return {
							restrict: 'ACE',
							template:"{{a}}" 
							
						};
					});
		</script>
	</div>


</body>
<%@include file="/jfe/common/JfeComFooter.jsp"%>
</html>