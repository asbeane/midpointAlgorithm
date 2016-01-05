/**************************************
*Author: Andrew Beane
*Assignment 1: Midpoint Algorithms
*Date: February 24, 2015
*
***************************************/

//Midpoint Algorithm for Line
function midPointLine(x1, y1, x2, y2)
{	 var yi = 1;
	 if(x1>x2)
    {
		  var temp;
		  var temp2;
		  temp = x1;
		  x1=x2;
		  x2=temp;
		  
		  temp2=y1;
		  y1=y2;
		  y2=temp2;
	 }

	 if(y1>y2)
	 {
		  yi = -1;
	 }	 

	 var dx = x2-x1;
	 var dy = y2-y1;
	 var cy= 0;
	 var s= Math.abs(dy/dx);	 
	 var y= y1;
	 if(x1==x2)
    {

		  while(Math.abs(y1-y2) != 0)
		  {
				if(y2>y1)
				{
	 				 ctx.fillRect(x1,y1,1,1);				
					 y1++;
			   }
				else if(y1>y2)
				{
					 ctx.fillRect(x1,y2,1,1);
					 y2++;
				}
		  }
	 }
	 else
    {
		  for(var x=x1; x<=x2;x++)
		  {
	 			ctx.fillRect(x,y,1,1);
	  			cy += s;
				if(cy >= 0.5)
				{
					 y += yi;
					 cy -= 1.0;
				}
		  }
	 }
}

var pLineValues = {
	 0:[50,300],
	 1:[50,350],
	 2:[150,350],
	 3:[200,300],
	 4:[350,400],
	 5:[400,500]
};

function polyline()
{

	 for(var i=0,j=1;i<Object.keys(pLineValues).length-1; i++,j++)
	 {
		  midPointLine(pLineValues[i][0],pLineValues[i][1],pLineValues[j][0],pLineValues[j][1]);
	 }
}

var pGonValues = {
	 0:[400,400],
	 1:[500,400],
	 2:[550,450],
	 3:[500,500],
	 4:[400,500],
	 5:[350,450]
};

function polygon()
{

	 for(var i=0;i<Object.keys(pGonValues).length; i++)
	 {
		  if(i<(Object.keys(pGonValues).length-1))
		  {
		  midPointLine(pGonValues[i][0],pGonValues[i][1], pGonValues[i+1][0],pGonValues[i+1][1]);
		  }
		  else
		  {
				midPointLine(pGonValues[i][0]+1,pGonValues[i][1], pGonValues[0][0]-1,pGonValues[0][1]);
		  }
	 }
}

//Midpoint Algorithm for Circle
function midPointCircle(x0, y0, r)
{
	 var x=r;
	 var y=0;

	 var error = 1-x;
	 while(x>=y)
	 {
		  pixelSet(x,y,x0,y0);
		  y=y+1;
		  if(error<0)
		  {
				error += y*2 +1;
		  }
		  else
		  {
				x--;
			   error += 2*(y-x) +1;
		  }
		  pixelSet(x,y,x0,y0);
	 }
}

//Circle Helper
function pixelSet(x, y, startX, startY)
{
	 ctx.fillRect(x+startX, y+startY, 1, 1);
	 ctx.fillRect(startX+y, x+startY, 1, 1);
	 ctx.fillRect(startX-x, startY+y, 1, 1);
	 ctx.fillRect(startX-y, startY+x, 1, 1);
	 ctx.fillRect(startX-x, startY-y, 1, 1);
	 ctx.fillRect(startX-y, startY-x, 1, 1);
	 ctx.fillRect(x+startX, startY-y, 1, 1);
	 ctx.fillRect(startX+y, startY-x, 1, 1);
}

//Mid point Algorithm for ellipse
function midPointEllipse(x0,y0,width,height)
{
	 var x=0;
	 var y=height;
	 var widthSquared  = width*width;
	 var heightSquared = height*height;

	 var i = 0;
	 var j = 2*widthSquared*y;
	 pixelSetEllipse(x,y,x0,y0);
	 var squaredDiff = heightSquared-(widthSquared*height)+(0.25*widthSquared);

	 while(i<j)
	 {
		  x++;
		  i= i + 2*heightSquared;
		  if(squaredDiff<0)
		  {
				squaredDiff = squaredDiff + heightSquared + i;
		  }
		  else
		  {
				y--;
				j=j-2*widthSquared;
				squaredDiff = squaredDiff + heightSquared + i - j;
		  }
		  pixelSetEllipse(x,y,x0,y0);
	 }
	
	 squaredDiff = heightSquared*((x+0.5)*(x+0.5)) + widthSquared*((y-1)*(y-1)) - widthSquared*heightSquared;
	 while(y>0)
	 {
		  y--;
		  j=j-2*widthSquared;
		  if(squaredDiff>0)
		  {
				squaredDiff=squaredDiff+widthSquared-j;
		  }
		  else
		  {
				x++;
				i=i+2*heightSquared;
				squaredDiff=squaredDiff+widthSquared-j+i;
		  }
		  pixelSetEllipse(x,y,x0,y0);
	 }
}

//Ellipse Helper
function pixelSetEllipse(x,y,_startX,_startY)
{
	 ctx.fillRect(_startX+x, _startY+y, 1, 1);
	 ctx.fillRect(_startX-x, _startY+y, 1, 1);
	 ctx.fillRect(_startX+x, _startY-y, 1, 1);
	 ctx.fillRect(_startX-x, _startY-y, 1, 1);
}

//pixel by pixel scroll over fill in for canvas
function ifMouseDown(e)
{
	 e.preventDefault();
	 var x = e.clientX;
	 var y = e.clientY;
	 x -= canvas.offsetLeft;
	 y -= canvas.offsetTop;
	 ctx.beginPath();
    ctx.fillRect(x,y,1,1);
	 ctx.closePath();
}

/*******************Main Area***************************/
var canvas= document.getElementById("canvas");
var line= document.getElementById("line");
var circle= document.getElementById("circle");
var ellipse= document.getElementById("ellipse");
var rectangle= document.getElementById("Rectangle");
var polyLine= document.getElementById("polyline");
var polyGon= document.getElementById("polygon");
var canvasLeft=canvas.offsetLeft;
var canvasTop=canvas.offsetTop;
var ctx= canvas.getContext("2d");
var circle_r=98
var ellip_w =70,ellip_l=100;

var count = 0;
var coordinates = [0, 0];

ctx.fillStyle = "#FF0000";

//Draw midpoint Line
line.addEventListener("click", function(){
	 midPointLine(1,1,175,175);
},false);

//Draw midpoint circle
circle.addEventListener("click", function(){
	 midPointCircle(300,100, circle_r);
	 circle_r--;
},false);

//Draw midpoint ellipse
ellipse.addEventListener("click", function(){
	 midPointEllipse(525,100,ellip_w,ellip_l);
	 ellip_w--;
	 ellip_l--;
	 
},false);


var tlx=100, tly=500, trx=300,trY=500, brx=300,bry=700,blx=100,bly=700;
//Draw Rectangle with midpoint line algorithm
rectangle.addEventListener("click", function(){
	 midPointLine(tlx,tly,trx,trY);
	 midPointLine(trx,trY,brx,bry);
	 midPointLine(brx,bry,blx,bly);
	 midPointLine(blx,bly,tlx,tly);
	 tlx++;
	 tly++;
	 trx--;
	 trY++;
	 brx--;
	 bry--;
	 blx++;
	 bly--;
},false);

//Draw polyline using midpoint Algorithm
polyLine.addEventListener("click", function(){
	 polyline();
},false);

//Draw polygon using midpoint line algorithm
polyGon.addEventListener("click", function(){
	 polygon();
},false);

//Pixel by pixel fill in while scrolling through window.
canvas.addEventListener("mousemove", function(e){
	 ifMouseDown(e);
},false);

//Line Draw on Canvas window via two clicks
canvas.addEventListener('click',function(e){
    var x;
    var y;

    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x = e.clientX + canvas.body.scrollLeft + canvas.documentElement.scrollLeft;
        y = e.clientY + canvas.body.scrollTop + canvas.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    if (count != 1) 
	 {
        count++;
    }
	 else
    {
		  midPointLine(coordinates[0],coordinates[1],x,y);
        count = 0;
    }

    coordinates= [x, y];

},false);
