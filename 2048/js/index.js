
$(document).ready(function() {

/*-------------------*/
/*----MODE GAME------*/
/*-------------------*/
	var cols = 4; 
	var lines = 4; 
	var length = cols*lines;
	//$('body').load('template/map.html');

/*-------------------*/
/*----CONTAINERS-----*/
/*-------------------*/
	$('body').html('<div id="container"><div id="grid"></div></div>');
	$('body').append('<div id="options"></div>');
	$('body').append('<div id="scores"><fieldset id="fieldscor"><legend>Scores:</legend></fieldset></div>');


/*-------------------*/
/*----COMPONENTS-----*/
/*-------------------*/

	//Table	
	$(document.getElementById('grid')).html('<table id="table"></table>');
	
	//Options
	$(document.getElementById('options')).append('<div id="reset"><fieldset><legend>Reset:</legend><img id="reload" src="images/reload.png"></img></fieldset></div>');
	$(document.getElementById('options')).append('<div id="dificulty"><fieldset id="field"><legend>Dificulty:</legend></fieldset></div>');
	$(document.getElementById('field')).append('<input type="checkbox" id="checkfour" checked="true"></input><img id="por4" class="imgchecked" src="images/4x4.png"></img>');
	$(document.getElementById('field')).append('<input type="checkbox" id="checkeight"></input><img id="por8" src="images/8x8.png"></img>');
	
	//Scores
	var score = new Score(0);
	
	$(document.getElementById('fieldscor')).append('<label id="score">Score: 0</label>');
	var highscore;
	if(localStorage['highscore_2048']){
		highscore = localStorage.getItem('highscore_2048');
	}else{
		highscore = 0;
	}
	$(document.getElementById('fieldscor')).append('<label id="highscore" >HighScore: '+highscore+'</label>');
	//$(document.getElementById('highscore')).append(' ' + highscore);
	
	//Grid
	var grid = new Grid(cols,lines);

	//End Game
	var end = new EndGame();

	//View 
	var view = new View(grid,end);

	//Controller
	var controller = new Controller(grid,view,score);

	//Frames
	createFrames(grid,lines,cols,controller);

	//Check browser
	var isMobileBrowser = mobilecheck();
	console.log(isMobileBrowser);
	
/*-------------------*/
/*-------EVENTS------*/
/*-------------------*/

	//RELOAD THE GAME
	$(this.getElementById('reload')).click(function (){
		load(true,controller);
	});

	//MOVES (Desktop: Keys, Mobile: Swipes)
	if(isMobileBrowser){
		$(document.getElementById('grid')).on('swipedown',function(){
			$('body').append('<label>Hola caracola pajarito sin cola esto funciona</label>');
		});
		$(document.getElementById('grid')).on('swipeup',function(){
			$('body').append('<label>Hola caracola pajarito sin cola esto funciona</label>');
		});
		$(document.getElementById('grid')).on('swiperight',function(){
			moveFrames('right',controller,view,grid,score);
		});
		$(document.getElementById('grid')).on('swipeleft',function(){
			moveFrames('left',controller,view,grid,score);
		});
	}else{
		$(this).keydown(function(key) {
			var code = key.which;
			switch(code){
				case 37: 
					moveFrames('left',controller,view,grid,score,end);
					break;
				case 38: 
					moveFrames('up',controller,view,grid,score,end);
					break
				case 39: 
					moveFrames('right',controller,view,grid,score,end);
					break;
				case 40: 
					moveFrames('down',controller,view,grid,score,end);
			}
		
		});
	}

	//CHECK FOR TABLE 4X4
	$(this.getElementById('por4')).click(function(){
		var eight = 8;
		$(document.getElementById('grid')).removeClass('grid' + eight.toString());
		$(document.getElementById('table')).empty();
		
		createFrames(grid,4,4,controller);
		
		$(document.getElementById('por4')).addClass('imgchecked');
		if($(document.getElementById('checkeight')).prop('checked')){
			$(document.getElementById('checkeight')).prop('checked',false);
			$(document.getElementById('por8')).removeClass('imgchecked');
		}
		$(document.getElementById('checkfour')).prop('checked',true);
	});

	//CHECK FOR TABLE 8X8
	$(this.getElementById('por8')).click(function(){
		var four = 4;
		$(document.getElementById('grid')).removeClass('grid' + four.toString());
		$(document.getElementById('table')).empty();
		
		createFrames(grid,8,8,controller);
		
		$(document.getElementById('por8')).addClass('imgchecked');
		if($(document.getElementById('checkfour')).prop('checked')){
			$(document.getElementById('checkfour')).prop('checked',false);
			$(document.getElementById('por4')).removeClass('imgchecked');
		}
		$(document.getElementById('checkeight')).prop('checked',true);
	});
});


//MAKE FRAMES AND PUT THEM IN THE TABLE
var createFrames = function(grid,lines,cols,controller){
	$(document.getElementById('grid')).addClass('grid' + cols.toString());
	var frames = [];
	var count= 0;
	for(var i=0;i<lines;i++){
		$(document.getElementById('table')).append("<tr id='tr" + i + "'></tr>");
		for(var j=0;j<cols;j++){
			$('#tr' + i + '').append("<td id='td" + count +"'></td>");
			$('#td' + count + '').addClass('frame' + cols);
			var frame = new Frame(count,j,i,'',grid);
			frames[count] = frame;
			count++;
		}
	}
	grid.frames = frames;
	grid.cols = cols;
	grid.lines = lines;
	controller.load(false);
};


// CALL TO THE CONTROLLER FOR THE LOGIC OF THE GAME
var moveFrames = function(way,controller,view,grid,score,end){
		
	var framesToMove = controller.move();
	var framesUpdated = controller.dirToMove(way,framesToMove);

	view.rePaint(framesToMove,framesUpdated);
	if(framesToMove.length == 0 && framesUpdated.length == 0){
		var framesOcupated = grid.getFramesNoEmpty();
		if(framesOcupated.length == grid.lines*grid.cols){
			if(!grid.isPosibleToMoveSomething()){
				alert('El juego ha terminado');
				if(localStorage.getItem('highscore_2048') < score.getValue()){
					localStorage['highscore_2048'] =  score.getValue();
				}
				controller.load(reload);
			}
		}
	}else{
		controller.addFrame(way);
	}

	if(end.getEnd()){
		end.endGame();
	}
};




