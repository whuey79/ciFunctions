
<script>

function tabDown( gid , verbose ) {
  // created ‎January ‎10, ‎2014
  // probably should refactor into jQuery

  var container, inputs;
  var qid = "", cname = "", out = "";
  var numOpt = 0,numCol = 0;
  var lastPre,currentPre, startIndex;
  var pArr = [], oArr = [];
  

  
  // Get the main container element
  container = document.getElementById('fieldset_' + gid);

  // Find its 'input' child elements
  inputs = container.getElementsByTagName('input');
  
  // -1 to adjust for algorithm 
  startIndex = inputs[0].tabIndex -1;  

  for (var i = 0; i < inputs.length; i++) {
  // iterate through pulling name and class
    qid = inputs[i].name;  
    cname = inputs[i].className;
    currentPre = qid.split("_");
  
    if (( cname == 'qinumeric' ) || ( cname == 'qiopentext' )) {  
    // if lastPrecode is appended at the end vs 'r' as in '_other'

      if ( lastPre != currentPre[currentPre.length-1] ) {
            lastPre = currentPre[currentPre.length-1];  
            // update lastPrecode
            numOpt++;  
            // this counts number of rows in the question
      }
      pArr.push( inputs[i] );  
      // add to PRECODE array
    }
    else {
      oArr.push( inputs[i] );  
      // add to OTHER textbox array
    }
  }  

  // by the end, number of shown rows/options is known 
  // ----- set tab indexes for NON-OTHER and OTHER

  numCol = pArr.length / numOpt;
  
  for (var i =0 ; i < numOpt; i++) {
    for (var j = 0; j< numCol; j++) {
      pArr[i*numCol + j].tabIndex = j* numOpt + i + 1 + startIndex;
    }
  }
  
  for (var i = 0; i < oArr.length; i++) {
    oArr[i].tabIndex = pArr[pArr.length-1].tabIndex + i + 1;
  }
  
  // ----- Verbose mode code - Show inputs and final tab indexes
  verbose = typeof verbose !== 'undefined' ? verbose : false;
  
  if (verbose) {
      for (var i = 0; i < inputs.length; i++) {
        qid = inputs[i].name;
        cname = inputs[i].className;
       
        out += qid;
        out += " \t TABINDEX: "; 
        out += inputs[i].tabIndex;
        out += ' \n';
      }
      alert(out);
  }
}

</script>