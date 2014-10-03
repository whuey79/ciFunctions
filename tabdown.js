/*
* remap tab index for vertical grids
* order should be regular inputs first, then any other textboxes afterwards
* @param {String} gid - 3d grid id
* untested
*/
function tabDown(gid) {
  var $container = $('#fieldset_'+gid), // cache container selector
      numColumns = $container.find('.qigscale').length,  // find number of Columns
      startTabIndex = $container.find('input').eq(0).attr('tabIndex'),
      $colInput;
    
  // update regular inputs by column
  for (var i =1; i<= numColumns; i++) {
    $colInput = $container.find("[headers*='header" + i + "']").find('input');
    $colInput.each(function(index,value) {
      $(this).attr('tabIndex',startTabIndex);
      startTabIndex++;
    });
  }
  
  // update other text boxes
  $container.find('.qiothertext').each( function(index,value) {
    $(this).attr('tabIndex',startTabIndex);
    startTabIndex++;
  });  
}