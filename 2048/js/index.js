
$(document).ready(function() {

/*-------------------*/
/*----MODE GAME------*/
/*-------------------*/
	var cols = 4;
	var lines = 4;
	var modegame = new ModeGame(lines + 'x' + cols);//4x4
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
	if(window.localStorage){
		if(localStorage['highscore_2048']){
			var aux = localStorage.getItem('highscore_2048');
			highscore = aux && JSON.parse(aux);
			console.log(aux);
		}else{
			highscore = {
				'4x4': 0,
				'8x8': 0
			};
			localStorage.setItem('highscore_2048', JSON.stringify(highscore));
		}
	}else{
		throw new Error('Your browser not supported localStorage');
	}
	$(document.getElementById('fieldscor')).append('<label id="highscore" >HighScore: '+highscore[modegame.getMode()]+'</label>');
	//$(document.getElementById('highscore')).append(' ' + highscore);
	
	//Grid
	var grid = new Grid(cols,lines);

	//End Game
	var end = new EndGame();

	//View 
	var view = new View(grid,end,modegame);

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

	var tableGame = $('body');

	//RELOAD THE GAME
	$(this.getElementById('reload')).click(function (){
		controller.load(true,modegame.getMode());
	});

	//MOVES (Desktop: Keys, Mobile: Swipes)
	if(isMobileBrowser){
		/*
		hammertime.on('swipeleft', function(){
			moveFrames('left',controller,view,grid,score,end,modegame);
		});
		hammertime.on('swiperight', function(){
			moveFrames('right',controller,view,grid,score,end,modegame);
		});
		hammertime.on('swipeup', function(){
			moveFrames('up',controller,view,grid,score,end,modegame);
		});
		hammertime.on('swipedown', function(){
			moveFrames('down',controller,view,grid,score,end,modegame);
		});
		*/
	}else{
		$(this).keydown(function(key) {
			var code = key.which;
			switch(code){
				case 37: 
					moveFrames('left',controller,view,grid,score,end,modegame);
					break;
				case 38: 
					moveFrames('up',controller,view,grid,score,end,modegame);
					break
				case 39: 
					moveFrames('right',controller,view,grid,score,end,modegame);
					break;
				case 40: 
					moveFrames('down',controller,view,grid,score,end,modegame);
			}
		
		});
	}

	//CHECK FOR TABLE 4X4
	$(this.getElementById('por4')).click(function(){
		
		
		
		$(document.getElementById('por4')).addClass('imgchecked');
		if($(document.getElementById('checkeight')).prop('checked')){
			$(document.getElementById('checkeight')).prop('checked',false);
			$(document.getElementById('por8')).removeClass('imgchecked');
			var eight = 8;
			$(document.getElementById('grid')).removeClass('grid' + eight.toString());
			$(document.getElementById('table')).empty();
		}else{
			return;
		}
		createFrames(grid,4,4,controller);

		$(document.getElementById('checkfour')).prop('checked',true);
		modegame.setModeGame('4x4');

		var high = localStorage.getItem('highscore_2048');
		var hscore = high && JSON.parse(high);

		$(document.getElementById('highscore')).html('HighScore: ' + hscore[modegame.getMode()]);
		$(document.getElementById('score')).html('Score: ' + 0);
	});

	//CHECK FOR TABLE 8X8
	$(this.getElementById('por8')).click(function(){
		
		$(document.getElementById('por8')).addClass('imgchecked');
		if($(document.getElementById('checkfour')).prop('checked')){
			$(document.getElementById('checkfour')).prop('checked',false);
			$(document.getElementById('por4')).removeClass('imgchecked');
			var four = 4;
			$(document.getElementById('grid')).removeClass('grid' + four.toString());
			$(document.getElementById('table')).empty();
		}else{
			return;
		}
		createFrames(grid,8,8,controller);

		$(document.getElementById('checkeight')).prop('checked',true);
		modegame.setModeGame('8x8');

		var high = localStorage.getItem('highscore_2048');
		var hscore = high && JSON.parse(high);

		$(document.getElementById('highscore')).html('HighScore: ' + hscore[modegame.getMode()]);
		$(document.getElementById('score')).html('Score: ' + 0);
	});
});


/**
 * [createFrames description]
 * @param  {[type]} grid       [description]
 * @param  {[type]} lines      [description]
 * @param  {[type]} cols       [description]
 * @param  {[type]} controller [description]
 * @return {[type]}            [description]
 */
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


/**
 * [moveFrames description]
 * @param  {[type]} way        [description]
 * @param  {[type]} controller [description]
 * @param  {[type]} view       [description]
 * @param  {[type]} grid       [description]
 * @param  {[type]} score      [description]
 * @param  {[type]} end        [description]
 * @param  {[type]} mode       [description]
 * @return {[type]}            [description]
 */
var moveFrames = function(way,controller,view,grid,score,end,mode){
		
	var framesToMove = controller.move();
	var framesUpdated = controller.dirToMove(way,framesToMove);

	view.rePaint(framesToMove,framesUpdated);

	//Check end of the game
	if(framesToMove.length == 0 && framesUpdated.length == 0){ //Nothing has been moved
		var framesOcupated = grid.getFramesNoEmpty();
		if(framesOcupated.length == grid.lines*grid.cols){//Grid full
			if(!grid.isPosibleToMoveSomething()){
				end.endGameBad(mode);
				alert('El juego ha terminado');
				controller.load(reload,mode);
			}
		}
	}else{
		controller.addFrame();
	}

	if(end.getEnd()){
		end.endGameGood();
	}
};




