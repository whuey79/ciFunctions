
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
* Untested
*/
function checkTargetListLessThanSourceList(src) {

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


// /*
// * -----------------------------------------------------------------------------------
// * pickMultiSegmentQuota rev3
// *
// *    Randomly sets totalNumSeen # of answers in a MULTI, with optional priority precodes
// *    Useful when you need to show X out of Y brands or sections
// *
// *    @param {string} [qid="brandShown"]
// *        This param needs to be the name of a MULTI that the function 
// *        will set dependent on parameters.  Use this MULTI as the masking criteria on loops or target grids
// *
// *    @param {string} [quotaName="brandCounter"]
// *        Quota required to close sections if needed.  Assume the quota contains only the MULTI pulled in there
// *
// *    @param {number} [totalNumSeen=1]
// *        total number of options that will be selected (at random) with priorities included 
// *
// *    @param {array[]} [alwaysAdd = 'none']
// *        Array of precodes with priority that will always be included in selection if not quota full
// *
// *    @param {array[]} [qidSubSet = f(qid).domainValues()]
// *        Checks subset of precodes contained in qid that comparisons will only be made against like
// *        a mask fulfilling criteria ie.  gridMask(qid,5,"<").members()
// *        otherwise defaults to all precodes in MULTI qid ie. f(qid).domainValues()
// * -----------------------------------------------------------------------------------
// */

function pickMultiSegmentQuota( options ) {
  
  var defaults = {
      "qid":"brandShown",
      "quotaName":"brandCounter",
      "totalNumSeen": 1, 
      "alwaysAdd": "none"
  }  
  
  var potentialPrecodesArray = [],
      sectionsAdded = 0, 
      rand = 0, 
      index = 0,
      i = 0; 
      
  var qid = options.qid || defaults.qid, 
      quotaName = options.quotaName || defaults.quotaName, 
      totalNumSeen = options.totalNumSeen || defaults.totalNumSeen, 
      alwaysAdd = options.alwaysAdd || defaults.alwaysAdd;

  // sets potential array to a subset if specified or to all options in the MULTI  
  var dv = options.qidSubset || f(qid).domainValues();

  // initialize all options in MULTI to 0
  initMulti(qid);
    
  // add priority array if quota is open and is found in subset
  if ( alwaysAdd !== 'none') {
      for (i = 0; i < alwaysAdd.length; i++) {  
        if (checkMultiQF(qid,alwaysAdd[i],quotaName) == false ) {
          index = getArrayIndex(dv, alwaysAdd[i].toString(), 0);

          if ( index > -1 ) {
            f(qid)[alwaysAdd[i]].set(1);
            dv.splice(index,1); 
            sectionsAdded++;
          }   
        }
      }
  }

  // Quota: Add section to potential pick if section is open
  for (i=0; i< dv.length; i++) {
    if (checkMultiQF(qid,dv[i],quotaName) == false ) {
      potentialPrecodesArray.push( dv[i] );
    }
  }

  // pick remaining totalNumSeen out of N potential items if room available
  for (i = sectionsAdded; i < totalNumSeen; i++) {
    rand = Math.floor(Math.random() * potentialPrecodesArray.length);
      if ( potentialPrecodesArray.length > 0 ) { 
        f(qid)[potentialPrecodesArray.splice(rand,1)].set(1); 
        sectionsAdded++;
      }
  }  

  // handle scenario when priorities > total num seen.  removes at random
  while (sectionsAdded > totalNumSeen) {
    dv = f(qid).categories();
    rand = Math.floor(Math.random() * dv.length);
    if ( dv.length > 0 ) { 
      f(qid)[dv.splice(rand,1)].set(0); 
    }
    sectionsAdded--;
  }
  
  
  function checkMultiQF(q,pre,qName) {
    var isQuotaFull = false;
    
    f(q)[pre].set(1);     
    if ( qf(qName) )    {
      isQuotaFull = true;
    }
    f(q)[pre].set(0);
    return isQuotaFull;
  }
  
  function initMulti(qid) {
    var allOptions = f(qid).domainValues();
  
    for (i=0; i< allOptions.length; i++) {
      f(qid)[allOptions[i]].set(0);
    }
  }
}