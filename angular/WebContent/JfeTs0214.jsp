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
<%-- <%@include file="/jfe/common/JfeComHeader.jsp"%> --%>
<script type="text/javascript">

var jobj = [ {
	"aitesakiCd" : "sdfa",
	"kensinkikanCd" : "0001",
	"kikanCd" : "0001",
	"kikanNm" : "事業主健診"
}, {
	"aitesakiCd" : "sdf",
	"kensinkikanCd" : "0002",
	"kikanCd" : "0002",
	"kikanNm" : "パート先健診"
}, {
	"aitesakiCd" : "df",
	"kensinkikanCd" : "001",
	"kikanCd" : "001",
	"kikanNm" : "札幌フジクリニック"
}, {
	"kikanCd" : "002",
	"kikanNm" : "エスエスサーティ健康管理センター"
}, {
	"aitesakiCd" : "2332",
	"kensinkikanCd" : "003",
	"kikanCd" : "003",
	"kikanNm" : "総合太田病院"
}, {
	"kikanCd" : "004",
	"kikanNm" : "宇都宮記念病院総合健診センター"
}, {
	"kikanCd" : "005",
	"kikanNm" : "城西総合健診センター"
}, {
	"aitesakiCd" : "sdf",
	"kensinkikanCd" : "006",
	"kikanCd" : "006",
	"kikanNm" : "大宮シティクリニック"
}, {
	"kikanCd" : "007",
	"kikanNm" : "藤間病院総合健診システム"
}, {
	"kikanCd" : "008",
	"kikanNm" : "柏健診クリニック"
}, {
	"aitesakiCd" : "df",
	"kensinkikanCd" : "009",
	"kikanCd" : "009",
	"kikanNm" : "汐留健診クリニック"
}, {
	"aitesakiCd" : "1112",
	"kensinkikanCd" : "010",
	"kikanCd" : "010",
	"kikanNm" : "清野診療室"
}, {
	"aitesakiCd" : "3456",
	"kensinkikanCd" : "011",
	"kikanCd" : "011",
	"kikanNm" : "八王子健康管理センター"
}, {
	"aitesakiCd" : "1111",
	"kensinkikanCd" : "012",
	"kikanCd" : "012",
	"kikanNm" : "鶯谷健診センター"
}, {
	"aitesakiCd" : "sdf",
	"kensinkikanCd" : "013",
	"kikanCd" : "013",
	"kikanNm" : "葛飾健診センター"
}, {
	"kikanCd" : "014",
	"kikanNm" : "社会保険新宿健診センター"
}, {
	"kikanCd" : "015",
	"kikanNm" : "東社協フィオーレ健診センター"
}, {
	"kikanCd" : "016",
	"kikanNm" : "霞が関ビル診療所"
}, {
	"kikanCd" : "017",
	"kikanNm" : "東都クリニック"
}, {
	"kikanCd" : "018",
	"kikanNm" : "中澤プレスセンタークリニック"
}, {
	"kikanCd" : "019",
	"kikanNm" : "聖路加国際病院付属クリニック"
} ];

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
<result1 = false;title>相手先マスタ
</title>
</head>
<body class="noFrameBody">

	<div id="header">
		<%-- <%@include file="JfeTs0200.jsp"%> --%>
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
				<tr ng-repeat="maitesaki in  maitesakiList">
					<td class="tblCel2L" width="22%">
						{{maitesaki.kikanCd}}

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
			angular
					.module("app", [])
					.controller(
							"ctrl",
							function($scope) {

								//var j = '${maitesakiListjson}';//必須单引号
								//$scope.maitesakiList = eval(j);

								
								$scope.maitesakiList = jobj;

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
		</script>
	</div>


</body>
<%@include file="/jfe/common/JfeComFooter.jsp"%>
</html>