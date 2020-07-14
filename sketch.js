

// Main video link https://www.youtube.com/watch?v=RUSvMxxm_Jo&t=483s
function preload()
{
	
}
var database
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;




var drawing = [];
var currentPath = [];
var isDrawing = false

function setup() {
	canvas = createCanvas(200, 200);
	canvas.mousePressed(startPath);
	canvas.parent('canvascontainer')
	canvas.mouseReleased(endPath);

	database = firebase.database();

	var saveButton = select('#saveButton');
	saveButton.mousePressed(saveDrawing)
	

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.


	Engine.run(engine);
  
}

function startPath(){
	isDrawing = true
	currentPath = []
	drawing.push(currentPath)
}

function endPath(){
	isDrawing = false; 
}

function draw() {
  rectMode(CENTER);
  background(0);

  if (isDrawing){ 
	  var point = {
		  x: mouseX,
		  y:mouseY
	  }
	currentPath.push(point); 
  }

stroke(255);
strokeWeight(4);
noFill();
  for ( var i = 0; i < drawing.length; i++){
	  var path = drawing [i];
	  beginShape();
	for ( var j = 0; j < path.length; j++){
	  vertex(path[j].x,path[j].y)
	}
	endShape();
  }
  

  //console.log(drawing)
  
  


  
 
}

function saveDrawing(){
	var ref = database.ref('drawings')
	var data = {
		name : "Namit",
		drawing:drawing
		
	}
	var result = ref.push(data,dataSent);
	console.log(result.key);

	function dataSent(err,status){
		console.log(status)
	}

}

