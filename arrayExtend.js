function randArray(arr) {
  // returns copy of input array randomized
  var val = 0;
  var temp = arr.slice();  // clone input to maintain original array
  var result = [];
  
  while (temp.length > 0) {
    val = Math.floor(Math.random() * temp.length);
    result.push( temp.splice(val,1)[0] );  // splice returns an array of len 1
  }
  return result;
}

function createArray(len,maxVal) {
  // returns test array of given length with random values
  // maxVal (optional) : range 0-maxVal or 0-9
  var a = [];
  
  var max = ( typeof maxVal !== 'undefined' ) ? maxVal : 10;  
  
  for (var i = 0; i<len; i++) {
    a.push(Math.floor(Math.random() * max));
  }
  return a;
}