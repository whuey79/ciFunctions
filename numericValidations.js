function checkTargetNumAgainstSourceNum(src,type) {
// validation for single numeric vs single numeric
  var tar = CurrentForm();
  var max = f(src).toNumber();
  validateAB(value1,value2,type);
}

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
    validateAB(value1,value2,type,rowLabel);
  }
}

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
    validateAB(value1,value2,type,rowLabel);
  }
}

function validateAB(value1,value2,type,rowLabel) {
    var endOfMessage = "";

    if (typeof rowLabel !== 'undefined') {
      endOfMessage = " for &laquo;" + rowLabel + "&raquo;";
    }
    endOfMessage += ".";

    switch ( type ) {
      case "=":
      case "==":
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
          AppendQuestionErrorMessage(LangIDs.en, "The value entered must be greater than " + value2 + endOfMessage);
        }
      break;
    }
}

/*
function checkTargetNumLessThanSourceNum(src) {
// validation for single numeric <= numeric

  var tar = CurrentForm();
  var max = f(src).toNumber();

  if( f(tar).toNumber() > max ) {
    RaiseError();
    AppendQuestionErrorMessage(LangIDs.en, "Your answer must be less than or equal to " + max + ".");
  }
}

function checkTargetListLessThanSourceNum(src,pre) {
// validation for numeric list <= single numeric (pre is optional)
  var tar = CurrentForm();
  var dv = f(tar).domainValues();
  var max;
  
  if (typeof pre !== 'undefined') {
    max = f(src)[pre].toNumber();
  } else {
    max = f(src).toNumber();
  }
  
  for (var i = 0; i < dv.length; i++) {
    if( f(tar)[ dv[i] ].toNumber() > max ) {
      RaiseError();
      AppendQuestionErrorMessage(LangIDs.en, "Your answer for " + f(tar)[ dv[i] ].label() + " must be less than or equal to " + max + ".");
    }
  }
}

function checkTargetListLessThanSourceList(src) {
// validation for numeric list <= numeric list (should be same list)
  var tar = CurrentForm();
  var dv = f(tar).domainValues();
  var max;
    
  for (var i = 0; i < dv.length; i++) {
    max = f(src)[dv[i]]].toNumber();
    
    if( f(tar)[ dv[i] ].toNumber() > max ) {
      RaiseError();
      AppendQuestionErrorMessage(LangIDs.en, "Your answer for " + f(tar)[ dv[i] ].label() + " must be less than or equal to " + max + ".");
    }
  }
}
*/