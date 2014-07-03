
function clearQID(qid) { 
/*
* Clear the answers of any question
* @param {String} qid - question id
* Tested
*/

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

function pipeLoop(qid,iter) { 
/*
* edited pipe func for loop piping
* @param {String} qid - question id
* @param {String} iter - loop iteration
* Tested
*/

  var pipedArr = new Array(); 
  var d = a(qid,iter).members(); 
 
  for ( var i=0; i<d.length; i++ ) { 
    if ( f(qid,iter)[d[i]].toBoolean() ) { 
      pipedArr[i] = "'"+d[i]+"|"+f(qid,iter)[d[i]]+"'"; 
    } 
  } 
  return "["+pipedArr+"]"; 
}

function setPipe(qid,pre) {
/*
* sets id of input to pipe style (readOnly & color) - jQuery
* @param {String} qid - question id
* @param {String} pre - question precode
* Untested
*/

  var id = '#' + qid;

  if ( pre ) {
    id += '_' + pre;
  }
  var x = $(id);
  if (x) {
    x.attr('readOnly',true);
    x.css("backgroundColor", "#e1e1e1");
  }
}

function newPopup(url) {
/*
* Sawtooth popup function (JS)
* @param {String} url - destination url
* Tested
*/
    popupWindow = window.open(
      url,'popUpWindow','width=900,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
}

function checkTargetNumLessThanSourceNum(src) {
/*
* Validation for single numeric <= numeric
* @param {String} src - source question id
* @throws error message
* Tested
*/

  var tar = CurrentForm();
  var max = f(src).toNumber();

  if( f(tar).toNumber() > max ) {
    RaiseError();
    AppendQuestionErrorMessage(LangIDs.en, "Your answer must be less than or equal to " + max + ".");
  }
}


function checkTargetListLessThanSourceNum(src,pre) {
/*
* validation for numeric list <= single numeric 
* @param {String} src - source question id
* @param { Int | String } pre (Optional) - question precode
* Untested
*/

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
/*
* validation for numeric list <= numeric list (assume same list)
* @param {String} src - source question id
* Untested
*/

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