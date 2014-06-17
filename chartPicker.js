clearQID('cxTracker');  
setCXTracker();

// from Blinatumomab

function setCXTracker() {
 
    var s = [];  // arr of potential picked
    var p = [];  // arr of picked
    
    var a = [];  // chart A
    var b = [];  // chart B
    var c = [];  // chart C

    var d = [];   // chart A,B,C
    var q = [];   // QF Charts

    var rand = 0;
    var ptotal = 0;  // patient total

    // get values - possible refactor to params
    var aval = f('s13')[1].toNumber() + f('s13')[2].toNumber();
    var bval = f('s13')[3].toNumber();
    var cval = f('s13')[4].toNumber();

    
    if ( aval > 0 ) {
      if ( qf('chartA') == false ) {
        s.push(1);  // if chartA has at least 1 patient, push first option
        ptotal += aval;

        a.push(1);  // if chartA has 1+ patients, push 2nd option (2 of same chart max)
        if (aval > 1) { a.push(2); }
      }
      else {
        q.push(1);  // has chartA but quota is full
        if (aval > 1) { q.push(2); }   // push to qf array
      }
    }

    if ( bval > 0 ) {
      if ( qf('chartB') == false ) {
        s.push(4);
        ptotal += bval;

        b.push(4);
        if (bval > 1) { b.push(5); }
      }
      else {
        q.push(4);
        if (bval > 1) { q.push(5); }
      }
    }

    if ( cval > 0 ) {
      if ( qf('chartC')==false ) {
        s.push(7);
        ptotal += cval; 

        c.push(7);
        if (cval > 1) { c.push(8); }
      }
      else {
        q.push(7);
        if (cval > 1) { q.push(8); }
      }
    }

    // Arr debugging prints
    //Response.Write("s: " + s + "<br>");       
    //Response.Write("a: " + a + "<br>");
    //Response.Write("b: " + b + "<br>");
    //Response.Write("c: " + c + "<br>");  
    //Response.Write("ptotal: " + ptotal + "<br>"); 
    
    if ( ptotal > 2 ) {  // user has at least 2 patients charts
        d = a.concat(b);
        d = d.concat(c);     // completely random now
        // ** Add c to random chosen array for non priority  - 06/17 **
        //Response.Write("d: " + d + "<br>");  
                
        if ( s.length == 1 ) {  
            p.push( s[0] );  
            p.push( s[0]+1 );  
            p.push( s[0]+2 );
        }
              
        else if (s.length > 1) {     

        /*  // comment out priority C - 06/17
          for ( var i = 0; i < c.length; i++ ) {  // Add priority "c" array first
               p.push( c[i] );
          }
        */
        
        // add d.length check - 06/17
          while (p.length < 3 && d.length > 0) {
          
            rand = Math.floor(Math.random() * d.length );
            if ( d.length > 0 ) { 
                p.push ( d.splice(rand,1) );      
            }
          }
        }
    }
    else if ( ptotal == 2 ) {  // user has only 2 charts.  check QF array to see if user still qualifies
      if ( q.length > 0 ) {    
        if (s.length == 2) {  // user has 2 different charts
            for (var i =0; i< s.length; i++) {
              p.push(s[i]);
            }
        }
        else if (s.length == 1 ) {  // user has 2 of the same charts
          p.push( s[0] );
          if ( s[0] == 1 && a.length > 1 ) {
            p.push(s[0]+1);
          }
          else if ( s[0] == 4 && b.length > 1 ) {
            p.push(s[0]+1);
          }
          else if ( s[0] == 7 && c.length > 1 ) {
            p.push(s[0]+1);
          }
        }
        
        while (p.length <3 && q.length > 0) {  // fill until we have 3 charts or qf array is depleted
            rand = Math.floor(Math.random() * q.length );
            p.push( q.splice(rand,1) );
        }
      }
    }
    else if ( ptotal == 1 ) {  // user has only 1 chart.  check QF array to see if user can qual
        if ( q.length > 1 ) {  
        for (var i =0; i< s.length; i++) {
          p.push(s[i]);
        }
        
        while ( p.length < 3 && q.length > 0 ) {
          rand = Math.floor(Math.random() * q.length );
          p.push( q.splice(rand,1) );
        }
      }
    }

    
    if (p.length == 3) {    // set multi if user has 3 charts picked
        for (var i = 0; i < p.length; i++) {  
            f('cxTracker')[ p[i] ].set(1);
        } 
    }
}