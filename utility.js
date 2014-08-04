
/*
* Clear the answers of any question
* @param {String} qid - question id
* Tested
*/
function clearQID(qid) { 

  if (f(qid).COMPOUND) {  // question with multiple options
    var fcodes = f(qid).domainValues(); //all codes in f(qid) 

    for (var i : int = 0; i < fcodes.length; i++) { 
      f(qid)[fcodes[i]].set(null); // clear item 
    } 
  } 
  else  {  // question with one option
    f(qid).set(null); 
  } 
}

/*
* edited pipe func for loop piping
* @param {String} qid - question id
* @param {String} iter - loop iteration
* Tested
*/
function pipeLoop(qid,iter) { 

  var pipedArr = new Array(); 
  var d = a(qid,iter).members(); 
 
  for ( var i=0; i<d.length; i++ ) { 
    if ( f(qid,iter)[d[i]].toBoolean() ) { 
      pipedArr[i] = "'"+d[i]+"|"+f(qid,iter)[d[i]]+"'"; 
    } 
  } 
  return "["+pipedArr+"]"; 
}

/*
* sets id of input to pipe style (readOnly & color) - jQuery
* @param {String} qid - question id
* @param {String} pre - question precode
* Untested
*/
function setPipeStyle(qid,pre) {

  var id = '#' + qid;

  if ( pre ) {
    id += '_' + pre;
  }
  var x = $(id);
  if (x) {
    x.attr('readOnly',true);
    x.css('backgroundColor', '#e1e1e1');
  }
}

/*
* builds an unordered list from given array
* @param {Array} arr 
* Tested
*/
function buildUnorderedList(arr) {

  var text = "<ul>";

  for (var i = 0; i< arr.length; i++) {
    text += "<li>" + arr[i] + "</li>"
  }
  return text + "</ul>";
}

/*
* Sawtooth popup function (JS)
* @param {String} url - destination url
* Tested
*/
function newPopup(url) {

    popupWindow = window.open(
      url,'popUpWindow','width=900,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
}

/*
* Validation for single numeric <= numeric
* @param {String} src - source question id
* @throws error message
* Tested
*/
function checkTargetNumLessThanSourceNum(src) {

  var tar = CurrentForm();
  var max = f(src).toNumber();

  if( f(tar).toNumber() > max ) {
    RaiseError();
    AppendQuestionErrorMessage(LangIDs.en, "Your answer must be less than or equal to " + max + ".");
  }
}

/*
* validation for numeric list <= single numeric 
* @param {String} src - source question id
* @param { Int | String } pre (Optional) - question precode
* Untested
*/
function checkTargetListLessThanSourceNum(src,pre) {

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

/*
* validation for numeric list <= numeric list (assume same list)
* @param {String} src - source question id
* tested
*/
function checkTargetListLessThanSourceList(src) {

  var tar = CurrentForm();
  var dv = f(tar).domainValues();
  var max;
    
  for (var i = 0; i < dv.length; i++) {
    max = f(src)[ dv[i] ].toNumber();
    
    if( f(tar)[ dv[i] ].toNumber() > max ) {
      RaiseError();
      AppendQuestionErrorMessage(LangIDs.en, "Your answer for " + f(tar)[ dv[i] ].label() + " must be less than or equal to " + max + ".");
    }
  }
}

/*
* validation for date node vs another date node
* @param {String} sourceQid - source question id
* @param {String} targetQid - target question id
* @param {String} type - type of validation to enforce
* refactored for general case - Untested
*/
function checkDateAgainstOtherDate(sourceQid,targetQid,type) {
    // date constructor ( year, month0_11, day, hr, min, s )
    var dt1 = new Date( f(sourceQid).year(), f(sourceQid).month() - 1, f(sourceQid).day(), 0,0,0);
    var dt2 = new Date( f(targetQid).year(), f(targetQid).month() - 1, f(targetQid).day(), 0,0,0);
    
    switch ( type ) {
    	case "=":
		  case "==":
        if ( dt != dt2 ) {
          RaiseError();
          AppendQuestionErrorMessage(LangIDs.en, "The date entered must equal " + dt2.toDateString() + ".");
        }
			}
      break;
      case "<":
        if ( dt >= dt2 ) {
          RaiseError();
          AppendQuestionErrorMessage(LangIDs.en, "The date entered must be before " + dt2.toDateString() + ".");
        }
      break;
      case ">":
        if ( dt <= dt2 ) {
          RaiseError();
          AppendQuestionErrorMessage(LangIDs.en, "The date entered must be after " + dt2.toDateString() + ".");
        }
      break;
      case ">=":
        if ( dt < dt2 ) {
          RaiseError();
          AppendQuestionErrorMessage(LangIDs.en, "The date entered must be on or after " + dt2.toDateString() + ".");
        }
      break;
      case "<=":
        if ( dt > dt2 ) {
          RaiseError();
          AppendQuestionErrorMessage(LangIDs.en, "The date entered must be on or before " + dt2.toDateString() + ".");
        }
      break;
    }
}
