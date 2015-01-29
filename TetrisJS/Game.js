//Declaration of global variables
var canvas;
var context;
var _this;
var interval;
var piece;
var movementsPiece = [];
var audioState = true;
var pantalla = {
	width: 325,
	height: 650,
	pieces: [],
	paint: function(){
		context.beginPath();
		context.lineWidth = 0.5;
		context.strokeStyle = '#fff';
	
		for(var i = 1;i<this.width/32.5;i++){
			context.moveTo(32.5*i,0);
			context.lineTo(32.5*i,this.height);
		}

		for(var j = 1;j<this.height/32.5;j++){
			context.moveTo(0,32.5*j);
			context.lineTo(this.width,32.5*j);
		}
		context.stroke();	
	}
};


//Events and Init of game
$(document).ready(function(){	
	var dificulty = 100;
	var game = new Game(dificulty); //Dificulty in time

	$(document.getElementById("imagen")).click(function(e){
		if(audioState){
			document.getElementById("audio").pause();
			$(document.getElementById("imagen")).attr("src","SonidoOff.png");
			audioState = false;
		}else{
			document.getElementById("audio").play();
			$(document.getElementById("imagen")).attr("src","Sonido.png");		
			audioState = true;
		}
	});

	this.addEventListener("keydown", function(key){
		var code = key.which;
		switch(code){
			case 37: 
				movementsPiece[movementsPiece.length] = "left";
				break;
			case 38: 
				//game.move("up");
				break
			case 39: 
				movementsPiece[movementsPiece.length] = "right";
				break;
			case 40: 
				//game.move("down");
		}
	});
	game.initGame();	
});

//Logic of the game
function Game(dificulty){
	this.time = dificulty; //Game mode, more difficulty greater velocity
	this.initGame = function(){
		canvas = document.getElementById("canvas");
		canvas.width = pantalla.width;
		canvas.height = pantalla.height;
		context = canvas.getContext("2d");
		//context = canvas.getContext("3d");	
		pantalla.paint();

		_this = this;
		piece = _this.generatePiece();
		interval = setInterval(function(){_this.loop()},_this.time);	
	};

	this.loop = function(){
		piece.update();
		pantalla.paint();
		piece.paint();
		_this.paintPieces();

		if(_this.checkColision()){
			clearInterval(interval);
			pantalla.pieces[pantalla.pieces.length] = piece;
			piece = _this.generatePiece();
			interval = setInterval(function(){_this.loop()},_this.time);
		}
		if((piece.y+piece.height)>=pantalla.height){
			clearInterval(interval);
			pantalla.pieces[pantalla.pieces.length] = piece;
			piece = _this.generatePiece();
			interval = setInterval(function(){_this.loop()},_this.time);
		}
	};

	this.checkColision = function(){

		for(var j = pantalla.pieces.length-1;j>=0;j--){
			if((piece.height+piece.y) == pantalla.pieces[j].y){
				if((piece.x>pantalla.pieces[j].x && (pantalla.pieces[j].x+pantalla.pieces[j].width)>piece.x) || 
					((piece.x+piece.width)>(pantalla.pieces[j].x) &&
					 (pantalla.pieces[j].x+pantalla.pieces[j].width)>(piece.x+piece.width))) {
						return true;
				}else if(piece.x==pantalla.pieces[j].x &&
					(piece.x + piece.width)==(pantalla.pieces.x+pantalla.pieces.width)){
					return true;
				}else if((piece.x<pantalla.pieces[j].x && (pantalla.pieces[j].x+pantalla.pieces[j].width)<piece.x)){
					return true;
				}
			}	
		}
		return false;
	};

	this.paintPieces = function(){

		for(var i = 0;i<pantalla.pieces.length;i++){
			pantalla.pieces[i].paint();
		}
	};
	this.generatePiece = function(){
		var pieceNumber = Math.floor(Math.random() * 7);
		var positionInitPiece = Math.floor(Math.random() * 10);
		var possiblePieces = ['i','o','t','j','l','z','s'];
		var generatedPiece = new Piece(possiblePieces[pieceNumber]);

		//If the number of the position plus the width of piece is bigger than width of screen
		//I put the piece in pos (0,0)
		if(((positionInitPiece * 32.5) + generatedPiece.width) <= pantalla.width){
			generatedPiece.x = 32.5 * positionInitPiece;
		}	
		generatedPiece.paint();
		return generatedPiece;
	};
};

function Piece(tipo){
	this.x = 0;
	this.y = 0;
	this.update = function(){				
		context.clearRect(0,0,canvas.width,canvas.height);	
		if(movementsPiece.length>0){
			for(i=0;i<movementsPiece.length;i++){
				if(movementsPiece[i]=='right' && (this.x+this.width)<pantalla.width){
					this.x += 32.5;
				}else if(movementsPiece[i]=='left' && this.x>0){
					this.x -= 32.5;
				}
			}	
			movementsPiece = [];
		}
		this.y += 32.5;				
	};
	switch(tipo){
		case 'i': this.width = 130; this.height = 32.5; 		
			this.paint = function(){
				createPartPiece(this.x,this.y,"#00ffff");
				createPartPiece(this.x+32.5,this.y,"#00ffff");
				createPartPiece(this.x+65,this.y,"#00ffff");
				createPartPiece(this.x+97.5,this.y,"#00ffff");
			}; break;
		case 'j': this.width = 97.5; this.height = 65;
			this.paint = function(){
				createPartPiece(this.x,this.y,"#00f");
				createPartPiece(this.x,this.y+32.5,"#00f");
				createPartPiece(this.x+32.5,this.y+32.5,"#00f");
				createPartPiece(this.x+65,this.y+32.5,"#00f");
			}; break;
		case 't': this.width = 97.5; this.height = 65; 
			this.paint = function(){
				createPartPiece(this.x+32.5,this.y,"#c030ff");
				createPartPiece(this.x,this.y+32.5,"#c030ff");
				createPartPiece(this.x+32.5,this.y+32.5,"#c030ff");
				createPartPiece(this.x+65,this.y+32.5,"#c030ff");
			}; break;
		case 'o': this.width = 65; this.height = 65; 
			this.paint = function(){
				createPartPiece(this.x,this.y,"#ff0");
				createPartPiece(this.x+32.5,this.y,"#ff0");
				createPartPiece(this.x,this.y+32.5,"#ff0");
				createPartPiece(this.x+32.5,this.y+32.5,"#ff0");		
			}; break;
		case 'z': this.width = 97.5; this.height = 65; 
			this.paint = function(){
				createPartPiece(this.x,this.y,"#f00");
				createPartPiece(this.x+32.5,this.y,"#f00");
				createPartPiece(this.x+32.5,this.y+32.5,"#f00");
				createPartPiece(this.x+65,this.y+32.5,"#f00");
			}; break;
		case 's': this.width = 97.5; this.height = 65; 
			this.paint = function(){
				createPartPiece(this.x,this.y+32.5,"#0f0");
				createPartPiece(this.x+32.5,this.y+32.5,"#0f0");
				createPartPiece(this.x+32.5,this.y,"#0f0");
				createPartPiece(this.x+65,this.y,"#0f0");
			}; break;
		case 'l': this.width = 97.5; this.height = 65;
			this.paint = function(){
				createPartPiece(this.x+65,this.y,"#ff8000");
				createPartPiece(this.x,this.y+32.5,"#ff8000");
				createPartPiece(this.x+32.5,this.y+32.5,"#ff8000");
				createPartPiece(this.x+65,this.y+32.5,"#ff8000");
			}; break;
	}	
};

var createPartPiece = function(x,y,color){
	var grd = context.createRadialGradient(x+10,y+10,5,x+20,y+20,32.5);
	grd.addColorStop(0,color);
	grd.addColorStop(1,"black");
	context.fillStyle = grd;
	context.beginPath();			
	context.fillRect(x,y,32.5,32.5);
	context.stroke();
	context.closePath();
};