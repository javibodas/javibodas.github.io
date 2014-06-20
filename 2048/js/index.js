
$(document).ready(function() {
	
	/*--CONTENEDORES--*/
	$('body').html('<div id="container" class="container"><div id="grid"></div><div id="options"></div></div>');
	$('body').append('<div id="data"><label>Score: 0</label></div>');
	

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

	/*--EVENTS--*/
	$(this.getElementById('reload')).click(function (){
		load(true,grid,view);
	});

	$(this).keydown(function(key) {

		var code = key.which;
		switch(code){
			case 37: 
				moveFrames('left',grid,view);
				break;
			case 38: 
				moveFrames('up',grid,view);
				break
			case 39: 
				moveFrames('right',grid,view);
				break;
			case 40: 
				moveFrames('down',grid,view);
		}

		var number = Math.floor(Math.random() * 16);
		while(!grid.frames[number].isEmpty()){
			number = Math.floor(Math.random() * 16);
		}
		view.paint(grid.frames[number],'html','2');
		view.paint(grid.frames[number],'css','background-color','orange');
		grid.frames[number].val = '2';
		console.log('Posicion nuevo incluido: ' + number);
	});

	/*Init frames*/
	load(false,grid,view);

});


/*Put first twos in grid, or reload the grid*/
var load = function (reload,grid,view) {
		
		var controller = new Controller(grid,view);
		controller.load(reload);
};



var moveFrames = function(way,grid,view){
		
		var controller = new Controller(grid,view);
		var framesToMove = controller.move();
		console.log('Numero que se deben eliminar: ' + framesToMove.length);
		var framesUpdated = controller.dirToMove(way);
		console.log('Numero que debe ser pintado: ' + framesUpdated.length);

		view.rePaint(framesToMove,framesUpdated);
};



