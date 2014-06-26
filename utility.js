
function clearQID(qid) { 
// Clear the answers of a question

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
// edited pipe func for loop piping
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
// sets input id to pipe style (readOnly & color)
// note:  untested function
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
// Sawtooth popup function (JS only)
    popupWindow = window.open(
      url,'popUpWindow','width=900,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
  }