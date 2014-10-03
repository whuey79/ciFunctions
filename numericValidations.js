/*
* validation for single numeric vs single numeric
* @param {String} src - source question id
* @param {String} type - operator type ie '<', '==', '>='
* untested (refactored)
*/
function checkTargetNumAgainstSourceNum(src,type) {
// validation for single numeric vs single numeric
  var value1 = f(CurrentForm()).toNumber();
  var value2 = f(src).toNumber();
  checkAB(value1,value2,type);
}

/*
* validation for numeric list vs numeric list
* @param {String} src - source question id
* @param {String} type - operator type ie '<', '==', '>='
* untested (refactored)
*/
function checkTargetListAgainstSourceList(src,type) {
// validation for numeric list vs numeric list
  var tar = CurrentForm();
  var dv = f(tar).domainValues();
  var value2;
  var value1;
  var rowLabel;
    
  for (var i = 0; i < dv.length; i++) {
    value2 = f(src)[ dv[i] ].toNumber();
    value1 = f(tar)[ dv[i] ].toNumber();
    rowLabel = f(tar)[ dv[i] ].label();
    checkAB(value1,value2,type,rowLabel);
  }
}

/*
* validation for numeric list vs single numeric or single pre in numeric list (pre is optional)
* @param {String} src - source question id
* @param {String} type - operator type ie '<', '==', '>='
* @param {Int} pre (optional) - pre code source question if comparing against single numeric list option
* untested (refactored)
*/
function checkTargetListAgainstSourceNum(src,type,pre) {
// validation for numeric list vs single numeric or single pre in numeric list (pre is optional)
  var tar = CurrentForm();
  var dv = f(tar).domainValues();
  var value1,value2, rowLabel;
  
  if (typeof pre !== 'undefined') {
    value2 = f(src)[pre].toNumber();
  } else {
    value2 = f(src).toNumber();
  }
  
  for (var i = 0; i < dv.length; i++) {
    value1 = f(tar)[ dv[i] ].toNumber();
    rowLabel = f(tar)[ dv[i] ].label();
    checkAB(value1,value2,type,rowLabel);
  }
}

/*
* generic validation comparing value1 and value2 (needed for numeric check functions above)
* @param {Int} value1 = first operand
* @param {Int} value2 - second operand
* @param {String} type - operator type ie '<', '==', '>='
* @param {String} rowLabel (optional) - additional error information to be appended
* untested (refactored)
*/

function checkAB(value1,value2,type,rowLabel) {
// required for check functions above
    var endOfMessage = "";

    if (typeof rowLabel !== 'undefined') {
      endOfMessage = " for &laquo;" + rowLabel + "&raquo;";
    }
    endOfMessage += ".";

    switch ( type ) {
      case "=":
      case "==":
      case "===":
        if ( value1 !== value2 ) {
          RaiseError();
          AppendQuestionErrorMessage(LangIDs.en, "The value entered must equal " + value2 + endOfMessage);
      }
      break;
      case "<":
        if ( value1 >= value2 ) {
          RaiseError();
          AppendQuestionErrorMessage(LangIDs.en, "The value entered must be less than " + value2 + endOfMessage);
        }
      break;
      case ">":
        if ( value1 <= value2 ) {
          RaiseError();
          AppendQuestionErrorMessage(LangIDs.en, "The value entered must be greater than " + value2 + endOfMessage);
        }
      break;
      case ">=":
        if ( value1 < value2 ) {
          RaiseError();
          AppendQuestionErrorMessage(LangIDs.en, "The value entered must be greater than or equal to " + value2 + endOfMessage);
        }
      break;
      case "<=":
        if ( value1 > value2 ) {
          RaiseError();
          AppendQuestionErrorMessage(LangIDs.en, "The value entered must be less than or equal to " + value2 + endOfMessage);
        }
      break;
    }
}
