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