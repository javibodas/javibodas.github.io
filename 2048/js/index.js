
$(document).ready(function() {
	
	/*--MODE GAME--*/
	var cols = 4; //parseInt(prompt('Introduzca el numero de columnas'));
	var lines = 4; //parseInt(prompt('Introduzca el numero de lineas'));
	var length = cols*lines;
	//$('body').load('template/map.html');

	/*--CONTENEDORES--*/
	$('body').html('<div id="container"><div id="grid"></div></div>');
	$('body').append('<div id="options"></div>');
	$('body').append('<div id="scores"><fieldset id="fieldscor"><legend>Scores:</legend></fieldset></div>');
	var score = new Score(0);


	/*--COMPONENTS--*/
	//Table	
	$(document.getElementById('grid')).html('<table id="table"></table>');
	
	//Options
	$(document.getElementById('options')).append('<div id="reset"><fieldset><legend>Reset:</legend><img id="reload" src="images/reload.png"></img></fieldset></div>');
	$(document.getElementById('options')).append('<div id="dificulty"><fieldset id="field"><legend>Dificulty:</legend></fieldset></div>');
	$(document.getElementById('field')).append('<input type="checkbox" id="checkfour" checked="true"></input><img id="por4" src="images/4x4.png"></img>');
	$(document.getElementById('field')).append('<input type="checkbox" id="checkeight"></input><img id="por8" src="images/8x8.png"></img>');
	//Scores
	/*--SCORES--*/
	$(document.getElementById('fieldscor')).append('<label id="score">Score: 0</label>');
	var highscore;
	if(localStorage['highscore']){
		highscore = localStorage.getItem('highscore');
	}else{
		highscore = 0;
	}
	$(document.getElementById('fieldscor')).append('<label id="highscore" >HighScore: '+highscore+'</label>');
	//$(document.getElementById('highscore')).append(' ' + highscore);
	
	//Grid
	var grid = new Grid(cols,lines);

	//View 
	var view = new View(grid);

	//Frames
	var frames = [];
	var count= 0;
	for(var i=0;i<lines;i++){
		$(document.getElementById('table')).append("<tr id='tr" + i + "'></tr>");
		for(var j=0;j<cols;j++){
			$('#tr' + i + '').append("<td id='td" + count +"'></td>");
			$('#td' + count + '').addClass('frame');
			var frame = new Frame(count,j,i,'',grid);
			frames[count] = frame;
			count++;
		}
	}
	grid.frames = frames;

	//Controlador
	var controller = new Controller(grid,view,score);

	//Check browser
	var isMobileBrowser = mobilecheck();
	console.log(isMobileBrowser);
	/*--EVENTS--*/
	$(this.getElementById('reload')).click(function (){
		load(true,controller);
	});

	$(this).keydown(function(key) {
		if(isMobileBrowser){
			$(document.getElementById('grid')).on('swipedown',function(){
				console.log('Prueba');
			});

		}else{
			var code = key.which;
			switch(code){
				case 37: 
					moveFrames('left',controller,view,grid,score);
					break;
				case 38: 
					moveFrames('up',controller,view,grid,score);
					break
				case 39: 
					moveFrames('right',controller,view,grid,score);
					break;
				case 40: 
					moveFrames('down',controller,view,grid,score);
			}
		}
		
	});
	$(this.getElementById('checkfour')).click(function(){
		if($(document.getElementById('checkfour')).prop('checked')){
			$(document.getElementById('checkeight')).prop('checked')=false;
		}
	});
	$(this.getElementById('checkeight')).click(function(){
		if($(document.getElementById('checkeight')).prop('checked')){
			$(document.getElementById('checkfour')).prop('checked')=false;
		}
	});

	/*Init frames*/
	load(false,controller);

});


/*Put first twos in grid, or reload the grid*/
var load = function (reload,controller) {
		controller.load(reload);
};



var moveFrames = function(way,controller,view,grid,score){
		
		var framesToMove = controller.move();
		var framesUpdated = controller.dirToMove(way,framesToMove);

		view.rePaint(framesToMove,framesUpdated);
		if(framesToMove.length == 0 && framesUpdated.length == 0){
			var framesOcupated = grid.getFramesNoEmpty();
				if(framesOcupated.length == grid.lines*grid.cols){
					if(!grid.isPosibleToMoveSomething()){
						alert('El juego ha terminado');
						if(localStorage.getItem('highscore') < score.getValue()){
							localStorage['highscore'] =  score.getValue();
						}
						controller.load(reload);
					}
				}
		}else{
			controller.addFrame(way);
		}
};





