var socket = io();		      // socket.io instance. Connects back to the server
var g0z, g0y;
var g1z, g1y;
var g2z, g2y;
var g3z, g3y;
var g4z, g4y;
var g5z, g5y;
var g6z, g6y;
var g7z, g7y;

var padding = 100;
var paddingcounter = 0;
var paddingstate = true;

var pingpong = false;
var pingpongcounter = 0;

var sword = false;
var swordcounter = 0;

var ballflag = true;

var score = 0;

/////// HEAD ///////
var hdx = 750 + padding;
var hdy = 175;
var hdw = 100;
var hdh = hdw;
/////// HEAD ///////

/////// NECK ///////
var nx1 = 750 + padding;
var ny1 = 225;
var nx2 = 750 + padding;
var ny2 = 250;
/////// NECK ///////

/////// BODY ///////
var bdx = 700 + padding;
var bdy = 250;
var bdw = 100;
var bdh = 200;
/////// BODY ///////

/////// LEFT ARM ///////
var rax1 = 810 + padding;
var ray1 = 260;
var rax2 = g7z + padding;//g7z; //690 930; pif(rax2 > 870 + padding && rax2 < 930 + padding && ray2 > 230 && ray2 < 290 && rax3 > 900 + padding && rax3 < 960 + padding && ray3 > 90 && ray3 < 120
var ray2 = g7y;//g7y; //140 380;
var rax3 = g6z + padding;//g6z; //560 1060; sif(rax2 > 870 + padding && rax2 < 930 + padding && ray2 > 230 && ray2 < 290 && rax3 > 950 + padding && rax3 < 1010 + padding && ray3 > 230 && ray3 < 290)
var ray3 = g6y;//g6y;  //10 510;
/////// LEFT ARM ///////

/////// RIGHT ARM ///////
var lax1 = 690 + padding; 
var lay1 = 260;
var lax2 = g0z + padding;//g0z; //570 810
var lay2 = g0y;//g0y; //140 380
var lax3 = g1z + padding;//g1z; //440 940
var lay3 = g1y;//g1y; //10 510
/////// RIGHT ARM ///////

//PING PONG//
var ptx1 = lax3;
var pty1 = lay3;
var ptx2 = lax3 - 40;
var pty2 = lay3 - 30;

var phx1 = lax3 - 65;
var phy1 = lay3 - 50;
var phw1 = 50;
var phh1 = 60;
//PING PONG//

/////// RIGHT LEG ///////
var llx1 = 725 + padding;
var lly1 = 460;
var llx2 = g2z + padding; //g2z; 485 965      if(llx2 > 670 + padding && llx2 < 700 + padding && lly2 > 570 && lly2 < 600){
var lly2 = g2y; //220 700
var llx3 = g3z + padding;//g3z 225 1225 
var lly3 = g3y; //10 860 
/////// RIGHT LEG ///////

/////// LEFT LEG ///////
var rlx1 = 775 + padding;
var rly1 = 460;
var rlx2 = g5z + padding; //g5z 535 1015      if(rlx2 > 800 + padding && rlx2 < 830 + padding && rly2 > 570 && rly2 < 600){
var rly2 = g5y; //g5y 220 700
var rlx3 = g4z + padding; //g4 275 1275
var rly3 = g4y; //10 860
/////// LEFT LEG ///////

function setup() {
  createCanvas(1500, 900);   // set up the canvas
  if (ballflag)
    balls();
}

function draw() {
  background(255, 204, 0);        // make the screen white
  var fillColor = 230;      // set the fill color to black


  strokeWeight(5);
  fill(32,178,170);
  ellipse(hdx, hdy, hdw, hdh);    //head

  stroke(0);
  line(nx1,ny1,nx2,ny2);          //neck

  stroke(0);
  fill(34,139,34);
  rect(bdx,bdy,bdw,bdh);          //body
  fill(0,0,255);
  rect(bdx+30,bdy+20,40,20);

////// RIGHT ARM //////
lax2 = g0z + padding;//g0z; 570 810        
lay2 = g0y + padding;//g0y; 140 380         
lax3 = g1z + padding;//g1z; 440 940          
lay3 = g1y + padding;//g1y; 10 510           
////// RIGHT ARM //////


////// RIGHT LEG //////
llx2 = g2z + padding;//g2z; 485 965       
lly2 = g2y + padding;//g2y; 220 700        
llx3 = g3z + padding;//g3z; 225 1225       
lly3 = g3y + padding;//g3y; 10 860         
////// RIGHT LEG //////

////// LEFT LEG //////
rlx3 = g4z + padding; //g4z 275 1275
rly3 = g4y + padding; //10 860
rlx2 = g5z + padding; //g5z 535 1015
rly2 = g5y + padding; //g5y 220 700
////// LEFT LEG //////

////// LEFT ARM //////
rax3 = g6z + padding;//g6z; 690 930;
ray3 = g6y + padding;//g6y; 140 380; 
rax2 = g7z + padding;//g7z; 560 1060;  
ray2 = g7y + padding;//g7y; 10 510;
////// LEFT ARM //////




////// LEFT ARM //////


  noFill();
  smooth();
  stroke(102,0,204);
  strokeWeight(15.0);
  strokeJoin(ROUND);
  beginShape();
  vertex(rax1, ray1);
  vertex(rax2, ray2);
  vertex(rax3, ray3);
  endShape();
////// LEFT ARM //////

////// RIGHT ARM //////
  noFill();
  smooth();
  stroke(255,128,0);
  strokeWeight(15.0);
  strokeJoin(ROUND);
  beginShape();
  vertex(lax1, lay1);
  vertex(lax2, lay2);
  vertex(lax3, lay3);
  endShape();
////// RIGHT ARM //////

////// RIGHT LEG //////
  noFill();
  smooth();
  stroke(102,0,204);
  strokeWeight(15.0);
  strokeJoin(ROUND);
  beginShape();
  vertex(llx1, lly1);
  vertex(llx2, lly2);
  vertex(llx3, lly3);
  endShape();
////// RIGHT LEG //////

///// LEFT LEG //////
  noFill();
  smooth();
  stroke(255,128,0);
  strokeWeight(15.0);
  strokeJoin(ROUND);
  beginShape();
  vertex(rlx1, rly1);
  vertex(rlx2, rly2);
  vertex(rlx3, rly3);
  endShape();
////// LEFT LEG //////
  
  
  if(rlx2 > 800 + padding && rlx2 < 830 + padding && rly2 > 570 && rly2 < 600){
    var myInterval2 = setInterval(function () {
    ++paddingcounter;
    console.log(paddingcounter);
    }, 3000);
  }

    else{
      paddingcounter = 0;
      clearInterval(myInterval2);
    }

    if(paddingcounter > 2){
      padding = padding + 30;
      paddingcounter = 0;
    }

    if(llx2 > 670 + padding && llx2 < 700 + padding && lly2 > 570 && lly2 < 600){
    var myInterval3 = setInterval(function () {
    ++paddingcounter;
    console.log(paddingcounter);
    }, 3000);
  }

    else{
      paddingcounter = 0;
      clearInterval(myInterval3);
    }

    if(paddingcounter > 2){
      padding = padding - 30;
      paddingcounter = 0;
    }

  if(rax2 > 870 + padding && rax2 < 930 + padding && ray2 > 230 && ray2 < 290 && rax3 > 900 + padding && rax3 < 960 + padding && ray3 > 90 && ray3 < 120){  
    var myInterval1 = setInterval(function () {
    ++pingpongcounter;
    console.log(pingpongcounter);
    }, 3000);
  }
  else{
    pingpongcounter = 0;
    clearInterval(myInterval1);
  }

  if(pingpongcounter > 2){
      pingpong = true;
      sword = false;
  }
  if(pingpong){
    noFill();
    smooth();
    stroke(167, 85, 2);
    strokeWeight(15.0);
    strokeJoin(ROUND);
    beginShape();
    vertex(ptx1, pty1);
    vertex(ptx2, pty2);
    endShape();
    strokeWeight(4);
    fill(235,50,50);
    ellipse(phx1,phy1,phw1,phh1);
  }
if(rax2 > 870 + padding && rax2 < 930 + padding && ray2 > 230 && ray2 < 290 && rax3 > 950 + padding && rax3 < 1010 + padding && ray3 > 230 && ray3 < 290){
    var myInterval4 = setInterval(function () {
    ++swordcounter;
    console.log(swordcounter);
    }, 3000);
  }
  else{
    swordcounter = 0;
    clearInterval(myInterval4);
  }

  if(swordcounter > 2){
      sword = true;
      pingpong = false;
  }
  if(sword){
    noFill();
    smooth();
    stroke(0, 0, 0);
    strokeWeight(25.0);
    strokeJoin(ROUND);
    beginShape();
    vertex(ptx1, pty1);
    vertex(ptx2, pty2);
    endShape();

    strokeWeight(15);
    stroke(0, 0, 255);
    line(ptx2,pty2,ptx2-150, pty2-130);
  }

  strokeWeight(4);
  stroke(167, 85, 2);
  fill(235,50,50);
  sheqil();
  
}

var fruits = [[30, 30, 30, 30],[60, 60, 30, 30],[90, 90, 30, 30],[120, 120, 30, 30],[150, 150, 30, 30],[180, 120, 30, 30],[210, 90, 30, 30],[240, 60, 30, 30],[270, 30, 30, 30],[30, 870, 30, 30],[60, 840, 30, 30],[90, 810, 30, 30],[120, 780, 30, 30],[150, 750, 30, 30],[180, 780, 30, 30],[210, 810, 30, 30],[240, 840, 30, 30],[270, 870, 30, 30]];
function sheqil(){
  for (var i = 0; i < score; i++) {
    ellipse(fruits[i][0],fruits[i][1],fruits[i][2],fruits[i][3]);
  }

  // ellipse(30, 30, 30, 30);    // draw the ellipse
  // ellipse(60, 60, 30, 30);    // draw the ellipse
  // ellipse(90, 90, 30, 30);    // draw the ellipse
  // ellipse(120, 120, 30, 30);    // draw the ellipse
  // ellipse(150, 150, 30, 30);    // draw the ellipse     ////////  top left
  // ellipse(180, 120, 30, 30);    // draw the ellipse
  // ellipse(210, 90, 30, 30);    // draw the ellipse
  // ellipse(240, 60, 30, 30);    // draw the ellipse
  // ellipse(270, 30, 30, 30);    // draw the ellipse

  // ellipse(30, 870, 30, 30);    // draw the ellipse
  // ellipse(60, 840, 30, 30);    // draw the ellipse
  // ellipse(90, 810, 30, 30);    // draw the ellipse
  // ellipse(120, 780, 30, 30);    // draw the ellipse
  // ellipse(150, 750, 30, 30);    // draw the ellipse     ///////// bottom left
  // ellipse(180, 780, 30, 30);    // draw the ellipse
  // ellipse(210, 810, 30, 30);    // draw the ellipse
  // ellipse(240, 840, 30, 30);    // draw the ellipse
  // ellipse(270, 870, 30, 30);    // draw the ellipse
  
  // ellipse(1470, 30, 30, 30);    // draw the ellipse
  // ellipse(1440, 60, 30, 30);    // draw the ellipse
  // ellipse(1410, 90, 30, 30);    // draw the ellipse
  // ellipse(1380, 120, 30, 30);    // draw the ellipse
  // ellipse(1350, 150, 30, 30);    // draw the ellipse    ///////// top right
  // ellipse(1320, 120, 30, 30);    // draw the ellipse
  // ellipse(1290, 90, 30, 30);    // draw the ellipse
  // ellipse(1260, 60, 30, 30);    // draw the ellipse
  // ellipse(1230, 30, 30, 30);    // draw the ellipse
 
  // ellipse(1470, 870, 30, 30);    // draw the ellipse
  // ellipse(1440, 840, 30, 30);    // draw the ellipse
  // ellipse(1410, 810, 30, 30);    // draw the ellipse
  // ellipse(1380, 780, 30, 30);    // draw the ellipse
  // ellipse(1350, 750, 30, 30);    // draw the ellipse     ///////// bottom right
  // ellipse(1320, 780, 30, 30);    // draw the ellipse
  // ellipse(1290, 810, 30, 30);    // draw the ellipse
  // ellipse(1260, 840, 30, 30);    // draw the ellipse
  // ellipse(1230, 870, 30, 30);    // draw the ellipse
}
function balls(){

var x = 200 + padding; //initial position
var y = 200;

fill(255,0,0); //color
var r = 40;

var dx = 0;
var dy = 0;
var delta = 5; // range (from 0) of possible dx or dy change
var max = 15; // maximum dx or dy values
//addEventListener("click", togglestart);
var delay=3000; //1 second


//function togglestart() {
//    if (interval == undefined) interval = window.setInterval(animate, 120 / 60); // 60 FPS
//    else {
//        interval = clearInterval(interval);
//        console.log(interval);
//    }
//}

  var interval = window.setInterval(animate, 240 / 60);


  function animate() {
      var d2x = (Math.random() * delta - delta / 2); //change dx and dy by random value
      var d2y = (Math.random() * delta - delta / 2);

      if (Math.abs(d2x + dx) > max) // start slowing down if going too fast
      d2x *= -1;
      if (Math.abs(d2y + dy) > max) d2y *= -1;

      dx += d2x;
      dy += d2y;

      if(score < 18){
        if(pingpong){
          if(x - r < phx1 && y - r < phy1 && y + r > phy1 && x + r > phx1 ){
          score++;
          if (interval == undefined) 
            interval = window.setInterval(animate, 240 / 60); // 60 FPS
          else {
            interval = clearInterval(interval);
            console.log(interval);
          }
            setTimeout(function() {
              if (interval == undefined) 
                interval = window.setInterval(animate, 240 / 60); // 60 FPS
              else {
                interval = clearInterval(interval);
                console.log(interval);
              }
              x = 200 + padding;
              y = 200;
            }, delay);
            
          }
        }
        else if(sword){
        if(x - r < ptx2-150 && y - r < pty2-130 && y + r > pty2-130 && x + r > ptx2-150 ){
          score++;
          if (interval == undefined) 
            interval = window.setInterval(animate, 240 / 60); // 60 FPS
          else {
            interval = clearInterval(interval);
            console.log(interval);
          }
          setTimeout(function() {
            if (interval == undefined) 
              interval = window.setInterval(animate, 240 / 60); // 60 FPS
            else {
              interval = clearInterval(interval);
              console.log(interval);
            }
            x = 200 + padding;
            y = 200;
          }, delay);
          
        }
      }
      else{
        if(x - r < lax3 && y - r < lay3 && y + r > lay3 && x + r > lax3 ){
          score++;
          if (interval == undefined) 
            interval = window.setInterval(animate, 240 / 60); // 60 FPS
          else {
            interval = clearInterval(interval);
            console.log(interval);
          }
          setTimeout(function() {
            if (interval == undefined) 
              interval = window.setInterval(animate, 240 / 60); // 60 FPS
            else {
              interval = clearInterval(interval);
              console.log(interval);
            }
            x = 200 + padding;
            y = 200;
          }, delay);
          
        }
      }
    }
    else
    {
      strokeWeight(4);
      stroke(167, 85, 2);
      fill(235,50,50);
      sheqil();
      interval = clearInterval(interval);
      ballflag = false;
      alert("GAME OVER");
    }
    if ((x + dx) < 0 || (x + dx) > (width + padding) / 2) // bounce off walls
    dx *= -1;
    if ((y + dy) < 0 || (y + dy) > height / 2) dy *= -1;
    x += dx;
    y += dy;
    ellipse(x, y, r, r);
  }
}
function readData (data) {
  var results = data.split(',');  // split the data on the commas
  // if(g0z > 570 && g0z < 930 && g1z > 440 && g1z < 940 && g2z > 485 && g2z < 965 && g3z > 225 && g3z < 1225 && g4z > 275 && g4z < 1275 && g5z > 535 && g5z < 1015 && g6z > 690 && g6z < 930 && g7z > 560 && g7z < 1060  && g0y > 140 && g0y < 380 && g1y > 10 && g1y < 510 && g2y > 220 && g2y < 700 && g3y > 10 && g3y < 860 && g4y > 10 && g4y < 860 && g5y > 220 && g5y < 700 && g6y > 140 && g6y < 380 && g7y > 10 &&g7y < 510){
  if (results[0] == "0"){
    if(results[1] > 570 && results[1] < 930)
  g0z = results[1];                 // x is the first value
if(results[2] > 140 && results[2] < 380 )
  g0y = results[2];                 // y is the second value
}
  if (results[0] == "1"){            // button is the third value
    if(results[1] > 440 && results[1] < 940)
  g1z = results[1];                 // x is the first value
if(results[2] > 10 && results[2] < 510)
  g1y = results[2];                 // y is the second value
  //btn1 = results[3];
  }
  if (results[0] == "2"){            // button is the third value
    if(results[1] > 485 && results[1] < 965 )
  g2z = results[1];                 // x is the first value
if(results[2] > 460 && results[2] < 700)
  g2y = results[2];                 // y is the second value
  //btn2 = results[3];
  }
  if (results[0] == "3"){            // button is the third value
    if(results[1] > 225 && results[1] < 1225)
  g3z = results[1];                 // x is the first value
if(results[2] > 460 && results[2] < 860)
  g3y = results[2];                 // y is the second value
  //btn3 = results[3];
  }
  if (results[0] == "4"){            // button is the third value
    if(results[1] > 275 && results[1] < 1275)
  g4z = results[1];                 // x is the first value
if(results[2] > 460 && results[2] < 860)
  g4y = results[2];                 // y is the second value
  //btn4 = results[3];
  }
  if (results[0] == "5"){            // button is the third value
    if(results[1] > 535 && results[1] < 1015)
  g5z = results[1];                 // x is the first value
if(results[2] > 460 && results[2] < 700)
  g5y = results[2];                 // y is the second value
  //btn5 = results[3];
  }
  if (results[0] == "7"){            // button is the third value
    if(results[1] > 690 && results[1] < 930)
  g7z = results[1];                 // x is the first value
if(results[2] > 140 && results[2] < 380)
  g7y = results[2];                 // y is the second value
  //btn6 = results[3];
  }
  if (results[0] == "6"){            // button is the third value
    if(results[1] > 560 && results[1] < 1060)
  g6z = results[1];                 // x is the first value
if(results[2] > 10 &&results[2] < 510)
  g6y = results[2];                 // y is the second value
  //btn7 = results[3];
  }

  
   else{

   }
}
// when new data comes in the websocket, read it:
socket.on('message', readData);
