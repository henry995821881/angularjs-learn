//*****************************************************************************************************
// Public関数リスト
//---------------------------------------------------------------------------------
//  履歴：
//                  日付：2003/01/10 作成者：曹路    関数１～５
//                  日付：2003/01/17 修正者：曹路    関数２：flg(コンマ含むフラグ)を追加、空可
//                  日付：2003/02/19 修正者：曹路    関数３：[type]の３，４を追加
//                  日付：2006/09/21 修正者：柳田    関数３：[type]の６を追加
//---------------------------------------------------------------------------------
// １   checkNull (theField, s [,eok])              NULLもしくはスペースをチェックする
// ２   checkLength (theField, s, length [,flg])    長さをチェックする
// ３   checkType   (theField, s, type)             データのタイプをチェックする
//                                                  0:半角英数字
//                                                  1:半角数字
//                                                  2:数値型（半角数字＋[,]）
//                                                  3--小数（サインを含む不可）
//                                                  4--小数（サイン[+,-]を含む可）
//                                                  6--半角（type:4と同じであり、表示メッセージのみ異なる）
// ４   checkZenkaku(str_para)                      全角をチェックする
// ５   doClear()                                   フォームのTEXT要素をクリアする
//---------------------------------------------------------------------------------
//  履歴：
//                  日付：2003/01/21 作成者：曹路     関数６～１５
//---------------------------------------------------------------------------------
// ６   addComma(event)                             数字にコンマをいれる
// ７   commaFormatIE(event)                        IEの場合のみ、コンマでフォーマットする
// ８   commaFormatNN(event)                        Netscapeの場合のみ、コンマでフォーマットする
//
//      ６～８の関数を組み合わせてお使ってください。
//      使い方：
//           <INPUT TYPE="text" NAME="count" VALUE=""  class="txtright"
//              onkeypress="return commaFormatIE(event)"
//              onpaste="return false"       →貼付け禁止(IEのみ有効、StrutsTAGもサポートしていない)
//              ondragenter="return false"   →DragDrop禁止(IEのみ有効、StrutsTAGもサポートしていない)
//              onblur="addComma(event)"
//              style="ime-mode:Disabled"    →日本語入力禁止(IEのみ有効)
//              onkeyup="return commaFormatNN(event)">
//
// ９   getCalcuNumber(pValue)                      コンマ削除
// １０ getDisplayNumber(text)                      コンマ入れ
// １１ placeFocus()                                自動的にフォームの一つ目の編集できる項目にフォーカスする
//                                                  使い方：<body onload="placeFocus()">
// １２ checkYMD ( G, YY, MM, DD )                  年月日の妥当性チェック
//                                                  G   元号(数字) 0:明治、1:大正、2:昭和、3:平成
//                                                  YY   年(TEXTBOX)
//                                                  MM   月(TEXTBOX)
//                                                  DD   日(TEXTBOX)
// １３ convertYMD ( G, YY, MM, DD )                西暦変換
//                                                  G   元号(数字) 0:明治、1:大正、2:昭和、3:平成
//                                                  YY   年(TEXTBOX)
//                                                  MM   月(TEXTBOX)
//                                                  DD   日(TEXTBOX)
// １４ toLength( str, len )                        長さを0で補足。
// １５ checkFromTo( from, to, msg)                 日付範囲をチェック
//---------------------------------------------------------------------------------
//  履歴：
//                  日付：2003/01/22 作成者：曹路     関数１６
//---------------------------------------------------------------------------------
// １６ openGraphWin(url, winName, width, height, param) グラフ用の新たなWINDOWを開く
//---------------------------------------------------------------------------------
//  履歴：
//                  日付：2003/02/07 作成者：曹路     関数１７～１９
//---------------------------------------------------------------------------------
// １７ selectOption( selectbox, index )            SELECTコンポの値を変更する
// １８ selectAll( form )                           すべてのチェックボックスを選択する
// １９ clearAll( form )                            すべてのチェックボックスをクリアする
//---------------------------------------------------------------------------------
//  履歴：
//                  日付：2003/02/14 作成者：塗澤紅    関数２０
//---------------------------------------------------------------------------------
// ２０ checkDecimalFormat(theField, s, iLength, iDotUnderLength)   小数入力をチェックする
//                                                            例え：XXX.X
//---------------------------------------------------------------------------------
//  履歴：
//                  日付：2003/02/24 作成者：曹路     関数２１
//---------------------------------------------------------------------------------
// ２１ checkZIP(theField)                           郵便番号をチェックする(1234567 or 123-4567)
//---------------------------------------------------------------------------------
//  履歴：
//                  日付：2003/03/28 作成者：曹路     関数２２～２９
//---------------------------------------------------------------------------------
// ２２ openWin(url, winName, width, height, param) 新たなWINDOWを開く（リサイズ不可）
// ２３ rewriteLayer                                 DIVライター
// ２４ checkWareki                                  和暦チェック
// ２５ checkWarekiFromTo                            和暦チェック(下限と上限の範囲チェック)
// ２６ isNullWareki                                 和暦チェック(NULLチェック)
// ２７ isNullWarekiFromTo                           和暦チェック(下限と上限のNULLチェック)
// ２８ checkCommonFromToNull                        範囲チェック
// ２９ pressEnter                                   Enterキーの禁止
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
// ３０ openWin2(url, winName, width, height, param) 新たなWINDOWを開く（リサイズ可能）
//---------------------------------------------------------------------------------
//  履歴：
//                  日付：2006/09/05 作成者：yo      関数３１～３２
//---------------------------------------------------------------------------------
// ３１ checkWareki2                                 和暦チェック   元号(文字) M:明治、T:大正、S:昭和、H:平成
// ３２ checkWarekiFromTo2                           和暦チェック(下限と上限の範囲チェック) 元号(文字) M:明治、T:大正、S:昭和、H:平成
//****************************************************************************************************

//グローバル変数

//エラーメッセージ
var errNullSuffix = "を入力してください。"
var errLengthSuffix = "桁以下に入力してください。"
var errDigitalSuffix = "半角数字で入力してください。"
var errLetterOrDigitalSuffix = "半角英数字で入力してください。"
var errDay = "日の指定に誤りがあります。指定した月に許される日を入力してください。";
var errYMDPrefix = "の指定に誤りがあります。";
var errYMDSuffix = "を入力してください。";
var errFromTo = "開始日付が終了日付より小さい値を入力してください。";

var errDecimalSuffix = "小数で入力してください。";
var errDecimalSuffix1 = "半角で入力してください。";
var errDecimalSuffix2 = "半角数字で入力してください。";
var errCondition = "条件の設定が不十分です。";
var errDecimalFormat = "で入力してください。";

// スペース
var whitespace = " \t\n\r　";

// 小数点
var decimalPointDelimiter = "."

// ディフォルトのNULL可フラグ
var defaultEmptyOK = false

// ディフォルトのコンマ含むフラグ
var defaultCommaOK = true

// doClear()
// フォームのTEXT要素をクリアする
function doClear() {
    for(i=0;i<document.forms.length;i++){
      for(j=0;j<document.forms[i].elements.length;j++){
        var formObj=document.forms[i].elements[j];
        
        if(formObj.tagName.toLowerCase() == "input") {
            if(formObj.type.toLowerCase() == "text" ){
                formObj.value = "";
            }
        }
      }
    }
}

// checkNull (TEXTFIELD theField, STRING s, [, BOOLEAN emptyOK==false])
// NULLもしくはスペースをチェックする
function checkNull (theField, s, emptyOK)
{
    if (checkNull.arguments.length == 2) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    if (isWhitespace(theField.value))
       return warnEmpty (theField, s);
    else return true;
}

// checkNull2 (TEXTFIELD theField, [, BOOLEAN emptyOK==false])
// NULLもしくはスペースをチェックする
// メッセージを出さない
function checkNull2 (theField, emptyOK)
{
    if (checkNull2.arguments.length == 1) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    if (isWhitespace(theField.value))
        return false;
    else
        return true;
}

// checkLength (TEXTFIELD theField, STRING s, INT maxLength [, BOOLEAN commaOK==false])
// 長さをチェックする
function checkLength (theField, s, maxLength, commaOK)
{
    var str = theField.value;
    if (checkLength.arguments.length == 3) commaOK = defaultCommaOK;
    if(commaOK==false) str = getCalcuNumber(str);
    if(StrLen(str) > maxLength)
       return warnLength (theField, s, maxLength);
    else return true;
}

// checkType (TEXTFIELD theField, STRING s, STRING type)
// データのタイプをチェックする
// type: 0--半角英数字
//       1--数字
//       2--数字+[,]
//       3--小数（サインを含む不可）
//       4--小数（サイン[+,-]を含む可）
//       6--半角（type:4と同じであり、表示メッセージのみ異なる）
function checkType (theField, s, type)
{
    switch(type){
    case 0:
            for (i = 0; i < theField.value.length; i++)
            {
                var c = theField.value.charAt(i);
                if (!isLetterOrDigit(c)) {
                    warnType(theField, s, 0);
                    return false;
                }
            }
            break;
    case 1:
            for (i = 0; i < theField.value.length; i++)
            {
                var c = theField.value.charAt(i);
                if (!isDigit(c)) {
                    warnType(theField, s, 1);
                    return false;
                }
            }
            break;
    case 2:
            var str = getCalcuNumber(theField.value);
            for (i = 0; i < str.length; i++)
            {
                var c = str.charAt(i);
                if (!isDigit(c)) {
                    warnType(theField, s, 1);
                    return false;
                }
            }
            break;
    case 3:
            if(!isFloat(theField.value)) {
                warnType(theField, s, 2);
                return false;
            };
            break;
    case 4:
            if(!isSignedFloat(theField.value)) {
                warnType(theField, s, 2);
                return false;
            };
            break;
    case 5:
            //if(!isFloat(theField.value)) {
            //  warnType(theField, s, 1);
            //  return false;
            //};
            if ( !isFloat(theField.value) ) {
                warnType(theField, s, 1);
                return false;
            };

            var str1 = theField.value ;
            var index = str1.lastIndexOf(".") ;

            if ( index > -1 ) {
                var str2 = str1.substring( index + 1, str1.length ) ;

                if(str2.length > 1) {
                    warnLength(theField, s + "の小数点以下", 1);
                    return false;
                };
            }
            break;
    case 6:
            if(!isSignedFloat(theField.value)) {
                warnType(theField, s, 3);
                return false;
            };
            break;
    case 7:
            if(!isSignedFloat(theField.value)) {
                warnType(theField, s, 4);
                return false;
            };
            break;
    }
    return true;
}

// checkType2 (TEXTFIELD theField, STRING type)
// データのタイプをチェックする
// type: 0--半角英数字
//       1--数字
//       2--数字+[,]
//       3--小数（サインを含む不可）
//       4--小数（サイン[+,-]を含む可）
//       6--半角（type:4と同じであり、表示メッセージのみ異なる）
// メッセージを出さない
function checkType2 (theField, type)
{
    switch(type){
    case 0:
            for (i = 0; i < theField.value.length; i++)
            {
                var c = theField.value.charAt(i);
                if (!isLetterOrDigit(c)) {
                    return false;
                }
            }
            break;
    case 1:
            for (i = 0; i < theField.value.length; i++)
            {
                var c = theField.value.charAt(i);
                if (!isDigit(c)) {
                    return false;
                }
            }
            break;
    case 2:
            var str = getCalcuNumber(theField.value);
            for (i = 0; i < str.length; i++)
            {
                var c = str.charAt(i);
                if (!isDigit(c)) {
                    return false;
                }
            }
            break;
    case 3:
            if(!isFloat(theField.value)) {
                return false;
            };
            break;
    case 4:
            if(!isSignedFloat(theField.value)) {
                return false;
            };
            break;
    case 6:
            if(!isSignedFloat(theField.value)) {
                return false;
            };
            break;    
    }
    return true;
}

// NULLチェック
function isEmpty(s)
{   return ((s == null) || (s.length == 0))
}

// NULLもしくは全部スペースの場合、Trueを返す
function isWhitespace (s)
{
    var i;
    if (isEmpty(s)) return true;

    for (i = 0; i < s.length; i++)
    {
        var c = s.charAt(i);
        if (whitespace.indexOf(c) == -1) return false;
    }
    // 全部スペース
    return true;
}

// 必須項目にフォーカスする
// 必須項目の入力提示
function warnEmpty (theField, s)
{   theField.focus()
    alert(s + errNullSuffix)
    return false
}

// 項目にフォーカスする
// 項目長さを提示する
function warnLength (theField, s, maxLength)
{   theField.focus()
    alert(s + "：" + maxLength + errLengthSuffix)
    return false
}

// 項目にフォーカスする
// 項目の正しいタイプを提示する
function warnType (theField, s, type)
{   theField.focus()
    switch(type){
    case 0:
            alert(s + "を" + errLetterOrDigitalSuffix)
            break;
    case 1:
            alert(s + "を" + errDigitalSuffix)
            break;
    case 2:
            alert(s + "を" + errDecimalSuffix)
            break;
    case 3:
            alert(s + "を" + errDecimalSuffix1)
            break;
    case 4:
            alert(s + "を" + errDecimalSuffix2)
            break;
    }
    return false
}

// 項目にフォーカスする
// 項目の正しい入力方法を提示する
function warnYMD (theField, s, range)
{   theField.focus();
    alert(s+errYMDPrefix+range+errYMDSuffix);
    return false
}

// 項目にフォーカスする
// 正しい小数型を提示する
function warnDecimalFormat (theField, s)
{
    alert(s + errDecimalFormat);
    theField.focus();
    return false;
}

// 半角英文字(A .. Z, a..z)の場合、Trueを返す
function isLetter (c)
{   return ( ((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")) )
}

// 半角数字(0 .. 9)の場合、Trueを返す
function isDigit (c)
{   return ((c >= "0") && (c <= "9"))
}

// 半角英数字の場合、Trueを返す
function isLetterOrDigit (c)
{   return (isLetter(c) || isDigit(c))
}

// ストリングのバイト数を返す
function StrLen(str)
{
    var ct;
    var size = 0;

    for(ct = 0; ct < str.length; ct++) {
        if(checkZenkaku(str.substring(ct,ct+1))){
            size++;
        }
        size++;
    }
    return size;
}

//全角文字の場合、Trueを返す
function checkZenkaku(str_para){
    var i,xb,xb2,f_code;
    chk_flg = true;
    str=new String(str_para);
    for (i=0;i<=str.length-1;i++){
        b  = str.substring(i,i+1)
        xb = escape(b)
        if(xb.length==3){
            if ( (navigator.appName.charAt(0)=="N") &&
                 (navigator.appVersion.substring(0,4)>="4.06") ) {
                xb2 = xb.substring(1,3)
                if((("80"<=xb2)&(xb2<"A1"))|("DF" < xb2)){
                    chk_flg = true
                }else{
                    chk_flg=false
                    break
                }
            } else {
                xb2 = xb.substring(1,3)
                if((("80"<=xb2)&(xb2<"A1"))|("DF" < xb2)){
                    i++
                }else{
                    chk_flg=false
                    break
                }
            }
        }else{
            if(xb.length==6){
                f_code = xb.substring(0,2)
                if (f_code == "%u") {
                    xb2=xb.substring(2,6)
                    if((xb2<"FF61")|("FF9F" < xb2)){
                        chk_flg = true
                    }else{
                        chk_flg=false
                        break
                    }
                }else{
                    xb2 = xb.substring(1,3)
                    if((("80"<=xb2)&(xb2<"A1"))|("DF" < xb2)){
                        chk_flg = true
                    }else{
                        chk_flg=false
                        break
                    }
                }
            }else{
                if(xb.length == 4){
                    xb2=xb.substring(1,3)
                    if((("80"<=xb2)&(xb2<"A1"))|("DF" < xb2)){
                        chk_flg = true
                    }else{
                        chk_flg=false
                        break
                    }
                }else{
                    if(xb.length!=1){
                        chk_flg=false
                        break
                    }
                    chk_flg=false
                    break
                }
            }
        }
    }
    return chk_flg;
}

// コンマ削除
// 例：99,999　-->　99999
function getCalcuNumber(pValue) {
    if (pValue == null || pValue == "") {
       return "";
    }
    var index;
    var retVal = pValue;
    for (var i = 0; i < retVal.length; i++) {
        index = retVal.search(',');
        if (index == -1) {
            break;
        }
        else {
            retVal = retVal.substring(0, index) + retVal.substr(index + 1);
        }
    }
    return retVal;
}

// コンマ入れ
// 例：99999-->99,999
function getDisplayNumber(text) {
    if (text == null || text == "") {
       return "";
    }
    var ivTempText = "";
    var ivTempText1 = "";
    var ivLength;
    ivTempText1 = text;
    var ivFlag = 0;
    if (ivTempText1.charAt(0) == '-') {
        ivFlag = 1;
        ivTempText1 = ivTempText1.substr(1);
    }
    while(true) {
        ivLength = ivTempText1.length;
        if (ivLength > 3 ) {
            ivTempText = "," + ivTempText1.substring(ivLength - 3, ivLength) + ivTempText;
            ivTempText1 = ivTempText1.substring(0, ivLength - 3);
        }
        else {
            ivTempText = ivTempText1 + ivTempText;
            break;
        }
    }
    if(ivFlag == 1) {
        ivTempText = "-" + ivTempText;
    }
    return ivTempText;
}

// 数字にコンマをいれる
// e: Netscapeの場合のみ、「event」を渡したら結構である。
function addComma(e)
{
    if(window.event) {//IE
      var curTest = window.event.srcElement.value ;
      curTest = getCalcuNumber( curTest ) ;
      window.event.srcElement.value = getDisplayNumber( curTest ) ;
    } else {//Netscape
      var curTest = e.target.value ;
      curTest = getCalcuNumber( curTest ) ;
      e.target.value = getDisplayNumber( curTest ) ;
    }
}

// GLOBAL変数、Netscapeの場合のみ、カーソル制御用
var oldValue = "";

// IEの場合のみ、コンマでフォーマットする
// e: Netscapeの場合のみ、「event」を渡したら結構である。
function commaFormatIE(e)
{
    if(window.event) {//IE
        var elem = window.event.srcElement;
        var keyCode = window.event.keyCode;
        if( commaMSIE(e, elem, keyCode) ) {
            return false;
        }
        else {
            return false;
        }
    } else {//Netscape
        var elem = e.target;
        var keyCode = e.which;
        if(keyCode==0||keyCode==8) return true;
        if( keyCode<48||keyCode>57 ) {
            return false;
        }
        oldValue = elem.value;
        return true;
    }
}

// Netscapeの場合のみ、コンマでフォーマットする
// e: Netscapeの場合のみ、「event」を渡したら結構である。
function commaFormatNN(e)
{
    if(window.event) {//IE
        return true;
    } else {//Netscape
        var elem = e.target;
        var keyCode = e.which;
        if( commaNN(e, elem, keyCode) ) {
            return false;
        }
        else {
            if(keyCode==0||keyCode==8) return true;
            else return false;
        }
    }
}

// IEの場合のみ、コンマでフォーマットするアルゴリズム
// e: Netscapeの場合のみ、「event」を渡したら結構である。
// elem: TEXTBOX
// keyCode: 押したキーコード
function commaMSIE(e, elem,keyCode)
{
    replaceSelection(e,elem, "");
    if( keyCode>=48&&keyCode<=57 ) {
        var keyPressed = parseInt(keyCode,10)-48;
        storeCaret(elem);
        insertAtCaret(elem,""+keyPressed);
        var value = elem.value;
        var orgLength = value.length;
        value = getCalcuNumber( ""+value );
        storeCaret(elem);
        var pos = getCaretPos(elem);
        elem.value = getDisplayNumber( value );
        var newLength = elem.value.length;
        setCaretToPos(elem,pos+newLength-orgLength);
        return true;
    }
    else{
        return false;
    }
}

// Netscapeの場合のみ、コンマでフォーマットするアルゴリズム
// e: Netscapeの場合のみ、「event」を渡したら結構である。
// elem: TEXTBOX
// keyCode: 押したキーコード
function commaNN(e, elem,keyCode)
{
    var newValue = elem.value;
    var orgLength = oldValue.length;
    var pos = 0;
    for(  var i = 0; i < oldValue.length; i++ ){
        if(oldValue.charAt(i)==newValue.charAt(i)){
            if(i==oldValue.length-1){
                pos = oldValue.length+1;
                break;
            }
            continue;
        }
        pos = i;
        break;
    }
    value = elem.value;
    value = getCalcuNumber( ""+value );
    elem.value = getDisplayNumber( value );

    var newLength = elem.value.length;
    if( (keyCode>=48&&keyCode<=57)||(keyCode>=96&&keyCode<=105) ) {
        setCaretToPos(elem,pos+newLength-orgLength);
    }
    return true;
}

// 選択範囲を設定
// input: TEXTBOX
function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

// カーソルの位置を取得する
// elem:　TEXTBOX
function getCaretPos(elem)
{
  if ( elem.caretPos )
  {
    var bookmark = "~";
    var orig = elem.value;
    var caretPos = elem.caretPos;
    caretPos.text = bookmark;
    var i = elem.value.search( bookmark );
    elem.value = orig;
    return i;
  }
}

// カーソル位置を設定
// textbox: TEXTBOX
// pos: 位置
function setCaretToPos (textbox, pos) {
  setSelectionRange(textbox, pos, pos);
}

// カーソル位置を記憶
// textbox: TEXTBOX
function storeCaret (textbox) {
    if (textbox.createTextRange) {
        textbox.caretPos = document.selection.createRange().duplicate();
    }
}

// カーソル位置で文字列を追加する
// textbox: TEXTBOX
// text: 追加する文字列
function insertAtCaret (textbox, text) {
    if (textbox.createTextRange && textbox.caretPos) {
        var caretPos = textbox.caretPos;
        caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? text + ' ' : text;
    } else {
        textbox.value  = text;
    }
}

// 選択部分を指定ストリングで引き替える
// event: Netscapeの場合のみ、「event」を渡したら結構である。
// input: TEXTBOX
// replaceString: 引き替える文字列
function replaceSelection (event, input, replaceString) {

  if(window.event) {//IE
    if( window.event.keyCode<48||window.event.keyCode>57 ) {
        return false;
    }
  }
  else {//Netscape
    if( event.which<48||event.which>57 ) {
        return false;
    }
  }
  storeCaret(input);
  var orgValue = input.value;
  if (input.setSelectionRange) {
    var selectionStart = input.selectionStart;
    var selectionEnd = input.selectionEnd;
    input.value = input.value.substring(0, selectionStart)
                  + replaceString
                  + input.value.substring(selectionEnd);
    if (selectionStart != selectionEnd)
      setSelectionRange(input, selectionStart, selectionStart + replaceString.length);
    else
      setCaretToPos(input, selectionStart + replaceString.length);
  }
  else if (document.selection) {
    var range = document.selection.createRange();
    if (range.parentElement() == input) {
      var isCollapsed = range.text == '';
      range.text = replaceString;
      if (!isCollapsed)  {
        range.moveStart('character', -replaceString.length);
        range.select();
      }
    }
  }
  if(orgValue == input.value){
    return false;
  } else {
    return true;
  }
}

// 自動的にフォームの一つ目の編集できる項目にフォーカスする
/**
崔：common.jsのautoFocus()へ移動した。
function placeFocus() {
    if (document.forms.length > 0) {
        var field = document.forms[0];
        for (i = 0; i < field.length; i++) {
            if ((field.elements[i].type == "text") || (field.elements[i].type == "textarea") || (field.elements[i].type.toString().charAt(0) == "s")) {
                document.forms[0].elements[i].focus();
                break;
            }
        }
    }
}
*/

// 年月日妥当性チェック
// 入  力： G   元号 0:明治、1:大正、2:昭和、3:平成
//         YY   年
//         MM   月 (空可)
//         DD   日 (空可)
// 戻り値：true 正常終了
//        false 異常終了
// 備考：この関数を呼ぶ前に、タイプチェックを行ってください。
function checkYMD ( G, YY, MM, DD )
{
    // 変数定義
    var flgMM = 1;
    var flgDD = 1;
    if (checkYMD.arguments.length == 2){
        flgMM = 0;
        flgDD = 0;
    }
    if (checkYMD.arguments.length == 3){
        flgDD = 0;
    }
    var gengou = G;
    var yer = atoi(YY.value);
    if(flgMM == 1) var mon = atoi(MM.value);
    if(flgDD == 1) var day = atoi(DD.value);
    var leap = 0;       // うるう年フラグ

    // 範囲チェック
    if(gengou == 0){//明治０１年９月８日～明治４５年７月２９日
        if(yer < 1 || yer > 45){
            warnYMD(YY,"年","1-45");
            return false;
        }
        if( yer == 1){
            if(flgMM == 1) {
                if(mon < 9){
                    warnYMD(MM,"月","9-12");
                    return false;
                }
            }
            if(flgDD == 1) {
                if(mon ==9 && day < 8){
                    warnYMD(DD,"日","8-30");
                    return false;
                }
            }
        }
        if( yer == 44){
            if(flgMM == 1) {
                if(mon > 7){
                    warnYMD(MM,"月","1-7");
                    return false;
                }
            }
            if(flgDD == 1) {
                if(mon ==7 && day > 29){
                    warnYMD(DD,"日","1-29");
                    return false;
                }
            }
        }
    }
    if(gengou == 1){//大正０１年７月３０日～大正１５年１２月２４日
        if(yer < 1 || yer > 15){
            warnYMD(YY,"年","1-15");
            return false;
        }
        if( yer == 1){
            if(flgMM == 1){
                if(mon < 7){
                    warnYMD(MM,"月","7-12");
                    return false;
                }
            }
            if(flgDD == 1){
                if(mon ==7 && day < 30){
                    warnYMD(DD,"日","30-31");
                    return false;
                }
            }
        }
        if( yer == 15){
            if(flgMM == 1){
                if(mon > 12){
                    warnYMD(MM,"月","1-12");
                    return false;
                }
            }
            if(flgDD == 1){
                if(mon ==12 && day > 24){
                    warnYMD(DD,"日","1-24");
                    return false;
                }
            }
        }
    }
    if(gengou == 2){//昭和０１年１２月２５日～昭和６４年０１月０７日
        if(yer < 1 || yer > 64){
            warnYMD(YY,"年","1-64");
            return false;
        }
        if( yer == 1){
            if(flgMM == 1){
                if(mon < 12){
                    warnYMD(MM,"月","12");
                    return false;
                }
            }
            if(flgDD == 1){
                if(mon ==12 && day < 25){
                    warnYMD(DD,"日","25-31");
                    return false;
                }
            }
        }
        if( yer == 64){
            if(flgMM == 1){
                if(mon > 1){
                    warnYMD(MM,"月","1");
                    return false;
                }
            }
            if(flgDD == 1){
                if(mon ==1 && day > 7){
                    warnYMD(DD,"日","1-7");
                    return false;
                }
            }
        }
    }
    if(gengou == 3){//平成０１年１月８日
        if(yer < 1 || yer > 99){
            warnYMD(YY,"年","1-99");
            return false;
        }
        if( yer == 1){
            if(flgMM == 1){
                if(mon < 1){
                    warnYMD(MM,"月","1");
                    return false;
                }
            }
            if(flgDD == 1){
                if(mon ==1 && day < 8){
                    warnYMD(DD,"日","8-31");
                    return false;
                }
            }
        }
    }

    // 西暦年に変換する
    if(gengou==0){
        yer = yer + 1867;
    }
    if(gengou==1){
        yer = yer + 1911;
    }
    if(gengou==2){
        yer = yer + 1925;
    }
    if(gengou==3){
        yer = yer + 1988;
    }

    // 月チェック
    if (( mon < 1 ) || ( mon > 12 ))
    {
        warnYMD(MM,"月","1-12");
        return false;
    }

    // ４，６，９，１１月
    if (( mon == 4 ) || ( mon == 6 ) || ( mon == 9 ) || ( mon == 11 ))
    {
        // 30日より大きい日付が指定された場合、
        // 警告メッセージを出力
        if (( day < 1 ) || ( day > 30 ))
        {
            alert(errDay);
            DD.focus();
            return false;
        }
    }

    // ２月
    else if ( mon == 2 )
    {
        // うるう年判定
        if ((( yer % 4 == 0 ) && ( yer % 100 != 0 )) ||
            (( yer % 4 == 0 ) && ( yer % 400 == 0 )))
        {
            leap = 1;
        }

        // 28(+1)日より大きい日付が指定された場合、
        // 警告メッセージを出力
        if (( day < 1 ) || ( day > 28 + leap ))
        {
            alert(errDay);
            DD.focus();
            return false;
        }
    }

    // その他の月
    else
    {
        if (( day < 1 ) || ( day > 31 ))
        {
            alert(errDay);
            DD.focus();
            return false;
        }
    }

    return true;
}

// 数値化
// 入  力：i_DATA  対象文字列
// 戻り値：ret      変換後数値
// 備考：
// ・i_DATAは、10進数として認識出来る
//   数字である必要がある。
function atoi ( i_DATA )
{
    if(i_DATA == 'S') {
        //昭和
        i_DATA = '0';
    }

    if(i_DATA == 'H') {
        //平成
        i_DATA = '1';
    }


    // 変数定義
    var o_DATA = ' ';                   // 変換後数値
    var DATA_len = i_DATA.length;       // 変換前文字長
    var i = 0;                          // ループカウンタ
    var flag = true;                    // 変換終了フラグ

    // 一文字目が符号だったら、そのまま格納
    if (( i_DATA.charAt(0) == '+' ) || ( i_DATA.charAt(0) == '-' ))
    {
        o_DATA = i_DATA.charAt(0);
        i++;
    }

    // 変換処理群
    for ( ; i < DATA_len && flag == true; i++ )
    {
        if ( i_DATA.charAt(i) != '0' )
        {
            o_DATA = o_DATA + i_DATA.substring( i, DATA_len );
            flag = false;
        }
    }

    // ゼロセット
    if( flag == true)
    {
        if(o_DATA == ' '){
            o_DATA = '0';
        }
        else{
            o_DATA = o_DATA + '0';
        }
    }

    // 入力引数の数値化
    var ret = eval( o_DATA );

    return( ret );
}

// 西暦変換
// 入  力： G   元号 0:明治、1:大正、2:昭和、3:平成
//         YY   年
//         MM   月 (空可)
//         DD   日 (空可)
// 戻り値：YYYYMMDD
// 備考：この関数を呼ぶ前に、年月日チェック(checkYMD)を行ってください。
function convertYMD ( G, YY, MM, DD )
{
    // 変数定義
    var flgMM = 1;
    var flgDD = 1;
    if (convertYMD.arguments.length == 2){
        flgMM = 0;
        flgDD = 0;
    }
    if (convertYMD.arguments.length == 3){
        flgDD = 0;
    }
    var gengou = G;
    var yer = atoi(YY.value);
    if(flgMM == 1) var mon = atoi(MM.value);
    if(flgDD == 1) var day = atoi(DD.value);

    // 西暦年に変換する
    if(gengou==0){
        yer = yer + 1867;
    }
    if(gengou==1){
        yer = yer + 1911;
    }
    if(gengou==2){
        yer = yer + 1925;
    }
    if(gengou==3){
        yer = yer + 1988;
    }
    var ret = yer;
    if(flgMM == 1){
        ret = ret + toLength(mon,2);
    }
    if(flgDD == 1){
        ret = ret + toLength(day,2);
    }
    return ret;

}

// 長さを0で補足。
// 入力： str ストリング
//        len 長さ
// 戻り値： 変換したストリング
function toLength( str, len ){
    str = "" + str;
    if( str.length < len ){
        for( var i = len; i >= str.length; i-- ){
            str = "0" + str;
        }
    }
    return str+"";
}

// 日付範囲をチェック
// 入力：from 数字(YYYYMMDD)
//       to  数字(YYYYMMDD)
// 戻り値：true from<=to
//        false from>to
// 備考：通常、この関数を呼ぶ前に、convertYMD関数を行う。
function checkFromTo( from, to ,msg)
{
    if(from <= to){
        return true;
    }
    else{
        alert(msg);
        return false;
    }
}

// 日付範囲をチェック
// 入力：from 数字(YYYYMMDD)
//       to  数字(YYYYMMDD)
// 戻り値：true from<=to
//        false from>to
// 備考：通常、この関数を呼ぶ前に、convertYMD関数を行う。
function checkFromTo2( from, to )
{
    if(from <= to){
        return true;
    }
    else{
        return false;
    }
}

// ブラウザーのバージョンを判断する
function getAppVer() {
    var sVer = navigator.appVersion;
    var nVer = sVer.indexOf("MSIE");
    var appVer = "";
    if (nVer > 0) {
        appVer = "M" + sVer.substring(nVer + 5, nVer + 9);
    }
    else {
        appVer = "N" + sVer.substring(0, 4);
    }
    if (appVer.charAt(4) == " ") {
        appVer = appVer.substring(0, 4) + "0";
    }
    return appVer;
}

var appVer = getAppVer();

// 新たなWINDOWを開く
function openWin(url, winName, width, height, param) {
//  if(window.showModalDialog) {
//      var features = "dialogWidth:"+width+"px;dialogHeight:"+height+"px;"+"edge: Sunken; help: Yes; resizable: Yes; status: No;";
//      window.showModalDialog(url, param, features);
//  }
//  else{
        var win;
        win = window.open(url, winName,
                    "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=no"
                    +",left="
                    +((screen.availWidth-width)/2)
                    +",top="
                    +((screen.availHeight-height)/2)
                    +",width="
                    + width
                    +",height="
                    + height );
        win.focus();

        return win;
//  }
}

// 新たなWINDOWを開く（サイズ変更あり）
function openWin2(url, winName, width, height, param) {
//  if(window.showModalDialog) {
//      var features = "dialogWidth:"+width+"px;dialogHeight:"+height+"px;"+"edge: Sunken; help: Yes; resizable: Yes; status: No;";
//      window.showModalDialog(url, param, features);
//  }
//  else{
        var win;
        win = window.open(url, winName,
                    "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=yes"
                    +",left="
                    +((screen.availWidth-width)/2)
                    +",top="
                    +((screen.availHeight-height)/2)
                    +",width="
                    + width
                    +",height="
                    + height );
        win.focus();

        return win;
//  }
}

// 新たなWINDOWを開く(スクロールバーあり) 2005.06.27
function openWin3(url, winName, width, height, param) {
    var win;
    win = window.open(url, winName,
                "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no"
                +",left="
                +((screen.availWidth-width)/2)
                +",top="
                +((screen.availHeight-height)/2)
                +",width="
                + width
                +",height="
                + height );
    win.focus();

    return win;
}

// グラフ用の新たなWINDOWを開く（サイズ変更、スクロールバーあり）
function openGraphWin(url, winName, width, height, param) {
//  if(window.showModalDialog) {
//      var features = "dialogWidth:"+width+"px;dialogHeight:"+height+"px;"+"edge: Sunken; help: Yes; resizable: Yes; status: No;";
//      window.showModalDialog(url, param, features);
//  }
//  else{
        var win;
        win = window.open(url, winName,
                    "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes"
                    +",left="
                    +((screen.availWidth-width)/2)
                    +",top="
                    +((screen.availHeight-height)/2)
                    +",width="
                    + width
                    +",height="
                    + height );
        win.focus();

        return win;
//  }
}

// 1024バイトを超えたURLで新しいウィンドを開く。
function openLongUrlWindow(openFunc, url, winName, width, height, winParam) {

    //パラメータを解析する。
    var urlPath = url.split('?')[0];    
    var paramHash = url.parseQuery();
    var keys = $H(paramHash).keys();
    
    openFunc('about:blank', winName, width, height, winParam);
    var insertHtml = "<form  name=tempForm  action='"+urlPath+"' target='"+winName+"'  method=post>";

    //フォームにパラメータを追加する。
    for(var i=0; i<keys.length; i++){
        
        insertHtml += "<input type='hidden' name='"+keys[i]+"' value='"+paramHash[keys[i]]+"'>";
    }
    insertHtml += "</form>";
    document.body.insertAdjacentHTML("beforeEnd",insertHtml);
    
    document.tempForm.submit();
    document.tempForm.removeNode(true);
}

// サブウィンドウを閉じる（親ウィンドウにフォーカスをセット）
function closeWin(subWin) {
    if(!subWin.opener.closed) {
        subWin.opener.focus();
    }
    subWin.close();
}

//親ウィンドウからサブウィンドウを閉じる（親ウィンドウのonUnload時）
function closeSubWin(subWin) {
    if(subWin != null && !subWin.closed) {
        subWin.close();
    }
}

//　SELECTコンポの値を変更する
function selectOption( selectbox, index )
{
    for( var i = 0; i < selectbox.options.length; i++ )
    {
        if( i == index )
            selectbox.options[i].selected = true;
        else
            selectbox.options[i].selected = false;
    }
}

//　すべてのチェックボックスを選択する
function selectAll(form)
{

  for(i=0;i<form.elements.length;i++)
  {
    if(form.elements[i].type=="checkbox")
    {
        form.elements[i].checked=true;
    }
  }
  return true;

}

//　すべてのチェックボックスをクリアする
function clearAll(form)
{

  for(i=0;i<form.elements.length;i++)
  {
    if(form.elements[i].type=="checkbox")
    {
        form.elements[i].checked=false;
    }
  }
  return true;

}

// checkDecimalFormat (TEXTFIELD theField, STRING s, INT iLength, INT iDotUnderLength)
// 小数入力をチェックする（桁可変許可)
// 例え：   XXX.X
//         iLength = 3
//         iDotUnderLength = 1
function checkDecimalFormat(theField, s, iLength, iDotUnderLength)
{
    var str;
    var strDotUnder;
    var iDotPostion;

    // 小数値を取得
    str = theField.value;

    // 小数点の検索
    iDotPostion = str.indexOf(".");

    // 小数点以下の数値をチェック
    if(iDotPostion != -1)
    {
        // 小数点以下を取得
        strDotUnder = str.substring(iDotPostion+1, str.length);

        // 数値、長さのチェック
        if( strDotUnder.length <= 0 || strDotUnder.length > iDotUnderLength || !isNumeric(strDotUnder) )
        {
            return warnDecimalFormat (theField, s, iLength, iDotUnderLength);
        }

        // 小数点以上を取得
        str = str.substring(0, iDotPostion);
    }

    //符号の除去
    if(str.length > 0 && (str.charAt(0) == "+" || str.charAt(0) == "-")) {
        str = str.substring(1, str.length);
    }

    // 小数点以上の数値をチェック
    if( str.length <= 0 || str.length > iLength || !isNumeric(str) )
    {
        return warnDecimalFormat (theField, s, iLength, iDotUnderLength);
    }

    return true;
}

//  数字かどうかを判断する（複数桁）
//  引　数: str    --選択された文字列
//  戻り値: true   -- 数字
//         false  -- 非数字
function isNumeric( str )
{
    for( var i = 0; i < str.length; i++ )
    {
        if ( !isDigit( str.substring( i, i+1 ) ) )
        {
            return false;
        }
    }

    return true;
}

//  NotSignedかどうかを判断する（複数桁）
//  引　数: str    --選択された文字列
//  戻り値: true   -- Signed数字
//         false  -- 非Signed数字
function checkNotSigned(str,message)
{
    if ( (str.charAt(0) == "-") || (str.charAt(0) == "+") ){
		alert(message + 'で入力してください');
		return false;
	}

    return true;
}

// isFloat (STRING s [, BOOLEAN emptyOK])
// 小数：TRUE（サインを含む不可）
function isFloat (s)
{
    var i;
    var seenDecimalPoint = false;

    if (isEmpty(s))
       if (isFloat.arguments.length == 1) return defaultEmptyOK;
       else return (isFloat.arguments[1] == true);

    if (s == decimalPointDelimiter) return false;

    for (i = 0; i < s.length; i++)
    {
        var c = s.charAt(i);

        if ((c == decimalPointDelimiter) && !seenDecimalPoint) seenDecimalPoint = true;
        else if (!isDigit(c)) return false;
    }

    return true;
}

// isSignedFloat (STRING s [, BOOLEAN emptyOK])
// 小数：TRUE（サイン(+,-)を含む可）
function isSignedFloat (s)

{   if (isEmpty(s))
       if (isSignedFloat.arguments.length == 1) return defaultEmptyOK;
       else return (isSignedFloat.arguments[1] == true);

    else {
        var startPos = 0;
        var secondArg = defaultEmptyOK;

        if (isSignedFloat.arguments.length > 1)
            secondArg = isSignedFloat.arguments[1];

        if ( (s.charAt(0) == "-") || (s.charAt(0) == "+") )
           startPos = 1;
        return (isFloat(s.substring(startPos, s.length), secondArg))
    }
}

//DIVライター
function rewriteLayer (win, id, html)
{
    if (win.document.layers) { //for NN4
        var l = win.document[id];
        l.document.open();
        l.document.write(html);
        l.document.close();
    }
    else if (win.document.all) { //for IE
        win.document.all[id].innerHTML = html;
    }
    else if (win.document.createRange) { //for NN6,7
        var l = win.document.getElementById(id);
        var r = win.document.createRange();
        while (l.hasChildNodes())
            l.removeChild(l.lastChild);
        r.setStartAfter(l);
        var docFrag = r.createContextualFragment(html);
        l.appendChild(docFrag);
    }
}

//
// 郵便番号のチェック
// 引数： theField (###-#### or #######)
function checkZIP(theField){
    var str = theField.value;
    if(!checkNull2(theField)){
        return false;
    }
    var length = str.length;
    if(length!=7&&length!=8){
        return false;
    }
    var idx = eval(str.indexOf('-'));
    if(idx==-1){
        if (length==7&&checkType2(theField,1)) {return true;}
        else {return false;}
    }
    else{
	    if(length==7) {return false;}
        for(var i=0; i<str.length; i++){
            if(i==3){
                if(str.charAt(i)!='-') {
                    return false;
                }
            }
            else{
                if (!isDigit(str.charAt(i))){
                    return false;
                }
            }
        }
    }
    return true;
}


//
// 電話番号かチェックします。
// 引数: theField
function checkIsTelNumber(theField) {
  var str = theField.value;
  if ((str.match(/^[0-9]+\-[0-9]+\-[0-9]+$/) == null) && (checkNull2(theField))) {
    return false;
  }
  return true;
}


// doClear1()
// フォームのTEXT要素をクリアする
// フォームのOPTION要素をデフォールトにする
function doClear1() {
    for(i=0;i<document.forms.length;i++){
      for(j=0;j<document.forms[i].elements.length;j++){
        var formObj=document.forms[i].elements[j];
        if(formObj.type.toLowerCase() == "text" ){
          formObj.value = "";
        }else if(formObj.type.toLowerCase() == "select-one" ){
          formObj.options[0].selected = true;
        }
      }
    }
}


// doClear2()
// フォームのTEXT要素をクリアする
// フォームのTEXTAREA要素をクリアする
// フォームのOPTION要素をデフォールトにする
function doClear2() {
    for(i=0;i<document.forms.length;i++){
      for(j=0;j<document.forms[i].elements.length;j++){
        var formObj=document.forms[i].elements[j];
        if(formObj.type.toLowerCase() == "text" ){
          formObj.value = "";
        }else if(formObj.type.toLowerCase() == "textarea" ){
          formObj.value = "";
        }else if(formObj.type.toLowerCase() == "select-one" ){
          formObj.options[0].selected = true;
        }else if(formObj.type.toLowerCase() =="checkbox"){
            formObj.checked=false;
        }
      }
    }
}

function checkWareki(gengou, year, month, day, comName, onlyYearMonth ){
    if (checkNull(year,comName+"の年")==false) {return false;};
    if (checkNull(month,comName+"の月")==false) {return false;};
    if (!onlyYearMonth&&checkNull(day,comName+"の日")==false) {return false;};

    if (checkLength(year,comName+"の年",2)==false) {return false;};
    if (checkLength(month,comName+"の月",2)==false) {return false;};
    if (!onlyYearMonth&&checkLength(day,comName+"の日",2)==false) {return false;};

    if (checkType(year,comName+"の年",1)==false) {return false;};
    if (checkType(month,comName+"の月",1)==false) {return false;};
    if (!onlyYearMonth&&checkType(day,comName+"の日",1)==false) {return false;};

    var iGengou = atoi(gengou.value)+2;

    if(!onlyYearMonth){
        if (checkYMD(iGengou, year, month, day)==false) {return false;};
    }
    else{
        if (checkYMD(iGengou, year, month)==false) {return false;};
    }

    return true;

}

function checkWarekiFromTo(fromGengou, fromYear, fromMonth, fromDay, toGengou, toYear, toMonth, toDay, comName, onlyYearMonth ){
    if(!checkWareki(fromGengou, fromYear, fromMonth, fromDay, comName, onlyYearMonth)) {return false;};
    if(!checkWareki(toGengou, toYear, toMonth, toDay, comName, onlyYearMonth)) {return false};

    var fromG = atoi(fromGengou.options[fromGengou.selectedIndex].value)+2;
    var toG = atoi(toGengou.options[toGengou.selectedIndex].value)+2;
    //var from = convertYMD(fromG, fromYear, fromMonth, fromDay);
    //var to = convertYMD(toG, toYear, toMonth, toDay);
    //add by yo @20060912 begin--------------------------------------------------
    var from;
    var to;
    if (!onlyYearMonth) {
        from = convertYMD(fromG, fromYear, fromMonth, fromDay);
        to = convertYMD(toG, toYear, toMonth, toDay);
    } else {
        from = convertYMD(fromG, fromYear, fromMonth);
        to = convertYMD(toG, toYear, toMonth);
    }
    //add by yo @20060912 end--------------------------------------------------

    if (checkFromTo2(from,to)==false) {
        alert(comName+"の"+errFromTo);
        return false;
    };

    return true;
}

//add by yo @20060905 begin--------------------------------------------------
// 和暦年月日の必須、妥当性チェック
// 引数： nendo            M:明治、T:大正、S:昭和、H:平成
//        comName           チェックされた期間の名称
//        onlyYearMonth     true:日はNULL
//
// checkWareki2 (SELECTFIELD nendo, TEXTFIELD year, TEXTFIELD month, TEXTFIELD day,
//               STRING comName[, BOOLEAN onlyYearMonth==false])
function checkWareki2(nendo, year, month, day, comName, onlyYearMonth ){
    if (checkWareki2.arguments.length < 6) onlyYearMonth = false;

    if (checkNull(year,comName+"の年")==false) {return false;}
    if (checkNull(month,comName+"の月")==false) {return false;}
    if (!onlyYearMonth&&checkNull(day,comName+"の日")==false) {return false;}

    if (checkLength(year,comName+"の年",2)==false) {return false;}
    if (checkLength(month,comName+"の月",2)==false) {return false;}
    if (!onlyYearMonth&&checkLength(day,comName+"の日",2)==false) {return false;}

    if (checkType(year,comName+"の年",1)==false) {return false;}
    if (checkType(month,comName+"の月",1)==false) {return false;}
    if (!onlyYearMonth&&checkType(day,comName+"の日",1)==false) {return false;}

    var iGengou = nendo.value;
    if(iGengou == "M")      iGengou = 0;
    else if(iGengou == "T") iGengou = 1;
    else if(iGengou == "S") iGengou = 2;
    else if(iGengou == "H") iGengou = 3;

    if(!onlyYearMonth){
        if (checkYMD(iGengou, year, month, day)==false) {return false;}
    }
    else{
        if (checkYMD(iGengou, year, month)==false) {return false;}
    }

    return true;

}

// 和暦年月日FromTo期間の必須、妥当性、整合性チェック
// 引数： fromNendoとtoNendo  M:明治、T:大正、S:昭和、H:平成
//        comName             チェックされた期間の名称
//        onlyYearMonth       true:日はNULL
//
// checkWarekiFromTo2 (SELECTFIELD fromNendo, TEXTFIELD fromYear, TEXTFIELD fromMonth, TEXTFIELD fromDay,
//                     SELECTFIELD toNendo,   TEXTFIELD toYear,   TEXTFIELD toMonth,   TEXTFIELD toDay,
//                     STRING comName[, BOOLEAN onlyYearMonth==false])
function checkWarekiFromTo2(fromNendo, fromYear, fromMonth, fromDay, toNendo, toYear, toMonth, toDay, comName, onlyYearMonth ){
    if (checkWarekiFromTo2.arguments.length < 10) onlyYearMonth = false;

    if(!checkWareki2(fromNendo, fromYear, fromMonth, fromDay, comName, onlyYearMonth)) {return false;}
    if(!checkWareki2(toNendo,   toYear,   toMonth,   toDay,   comName, onlyYearMonth)) {return false;}

    var fromG = fromNendo.value;
    if(fromG == "M")        fromG = 0;
    else if(fromG == "T")   fromG = 1;
    else if(fromG == "S")   fromG = 2;
    else if(fromG == "H")   fromG = 3;
    var toG = toNendo.value;
    if(toG == "M")          toG = 0;
    else if(toG == "T")     toG = 1;
    else if(toG == "S")     toG = 2;
    else if(toG == "H")     toG = 3;

    var from;
    var to;
    if (!onlyYearMonth) {
        from = convertYMD(fromG, fromYear, fromMonth, fromDay);
        to = convertYMD(toG, toYear, toMonth, toDay);
    } else {
        from = convertYMD(fromG, fromYear, fromMonth);
        to = convertYMD(toG, toYear, toMonth);
    }

    if (checkFromTo2(from,to)==false) {
        alert(comName+"の"+errFromTo);
        return false;
    };

    return true;
}
//add by yo @20060905 end--------------------------------------------------

function isNullWareki( year, month, day ){
    if(!checkNull2(year)&&!checkNull2(month)&&!checkNull2(day)){
        return true;
    }
    return false;
}
function isNullWarekiFromTo( fromYear, fromMonth, fromDay, toYear, toMonth, toDay){
    if(isNullWareki(fromYear, fromMonth, fromDay)&&isNullWareki(toYear, toMonth, toDay)){
        return true;
    }
    return false;
}

function checkCommonFromToNull(from, to){
    if( (!checkNull2(from) && checkNull2(to))
        ||
        ( checkNull2(from) && !checkNull2(to))
    ){
        alert(errCondition);
        return false;
    }
    return true;
}
function pressEnter(keyStroke) {
    isIE=(window.event);
    keyCode = (isIE) ? event.keyCode : keyStroke.which;
    if (keyCode==13) {
        return false;
    }
    else{
        return true;
    }
}
function showHideBlock(id, action) {
    if(document.all) { //for IE
        document.all(id).style.display = action;
    }
    else if(document.getElementById) { //for NN6,7
        document.getElementById(id).style.display = action;
    }
}

//add by ko 20070426
function formatKigou(theField){
    var strKigou = theField.value;
    if(!isWhitespace(strKigou) && isNumeric(strKigou) && StrLen(strKigou)<4){
        var tmpkigou = strKigou;
        for(var i= 0;i<4-StrLen(strKigou);i++){
            tmpkigou = "0"+tmpkigou;
        }
        theField.value = tmpkigou;
    }
}

function openGraphWin2(url, winName, width, height, param) {
    var win;
    win = window.open(url, winName,
                "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes"
                +",left="
                +((screen.availWidth-width)/2)
                +",top="
                +((screen.availHeight-height)/2)
                +",width="
                + width
                +",height="
                + height );
    win.focus();

    return win;
}