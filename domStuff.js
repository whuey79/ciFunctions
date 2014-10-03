function enumScale(qid) {
// adds scale numbering underneath each table heading for likerts
  var $fs = $('#fieldset_' + qid);
  $fs.find('th.qigscale').each( function(index){ 
    index++;
    $(this).append("<br>" + index);
  });
}