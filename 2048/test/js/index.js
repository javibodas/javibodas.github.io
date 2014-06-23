
$(document).ready(function() {
	
	/*--CONTENEDORES--*/
	$('body').html('<div id="container" class="container"><div id="grid"></div><div id="options"></div></div>');
	$('body').append('<div id="score" class="data"><label>Score: 0</label></div>');

	var highscore;
	if(localStorage['highscore']){
		highscore = localStorage.getItem('highscore');
	}else{
		highscore = 0;
	}
	$('body').append('<div id="highscore" class="data"><label>HighScore: '+highscore+'</label></div>');

	/*--MODE GAME--*/
	var cols = 4;
	var lines = 4;
	var length = cols*lines;
	
	/*--COMPONENTS--*/
	//Table	
	$(document.getElementById('grid')).html('<table id="table"></table>');
	
	//Options
	$(document.getElementById('options')).html('<img id="reload" src="images/reload.png"></img>');
	

	//Grid
	var grid = new Grid(cols,lines);

	//View 
	var view = new View(grid);

	//Frames
	var frames = [];
	var count= 0;
	for(var i=0;i<lines;i++){
		$(document.getElementById('table')).append("<tr id='tr" +i+"'></tr>");
		for(var j=0;j<cols;j++){
			$('#tr' +i+'').append("<td id='td" + count +"'></td>");
			$('#td' +count+'').addClass('frame');
			var frame = new Frame(count,j,i,'',grid);
			frames[count] = frame;
			count++;
		}
	}
	grid.frames = frames;

	//Controlador
	var controller = new Controller(grid,view);

	/*--EVENTS--*/
	$(this.getElementById('reload')).click(function (){
		load(true,controller);
	});

	$(this).keydown(function(key) {

		var code = key.which;
		switch(code){
			case 37: 
				moveFrames('left',controller,view,grid);
				controller.addFrame();
				break;
			case 38: 
				moveFrames('up',controller,view,grid);
				controller.addFrame();
				break
			case 39: 
				moveFrames('right',controller,view,grid);
				controller.addFrame();
				break;
			case 40: 
				moveFrames('down',controller,view,grid);
				controller.addFrame();
		}
	});

	/*Init frames*/
	load(false,controller);

});


/*Put first twos in grid, or reload the grid*/
var load = function (reload,controller) {
		controller.load(reload);
};



var moveFrames = function(way,controller,view,grid){
		
		var framesToMove = controller.move();
		console.log('Frames para eliminar antes de moverlos: ' + framesToMove.length);
		var framesUpdated = controller.dirToMove(way,framesToMove);
		console.log('Frames para eliminar despues de moverlos: ' + framesToMove.length);
		/*
		if(framesToMove.length==0 && framesUpdated.length==0){
				alert('Fin del juego');
				return;
		}
		*/
		
		view.rePaint(framesToMove,framesUpdated);

};



