function rowHighlightMD() {
  //var $rows = $('.inner_table tr').not(':first');
  
  var $rows = $('.item_text').closest('tr');
  var newbg = { 'backgroundColor':'#e7edf1'};
  var whitebg = { 'backgroundColor':'white'};

  $rows.hover( 
    function() { 
      $(this).find('td').css(newbg);
      },
    function() { 
      $(this).find('td').css(whitebg);
      }
  );
}

function rowHighlightCBC() {
  //var $rows = $('.inner_table tr').not(':first');
  
  var $rows = $('.label_text').closest('tr');
  var newbg = { 'border':'1px solid black'};
  var whitebg = { 'border':'0'};

  $rows.hover( 
    function() { 
      $(this).css(newbg);
      },
    function() { 
      $(this).css(whitebg);
      }
  );
}

/*
.highlight {
  background-color:#e7edf1;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.inner_table tr:not(:first-child):hover td {
  background-color:#e7edf1;
}
*/