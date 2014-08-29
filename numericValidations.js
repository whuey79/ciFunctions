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