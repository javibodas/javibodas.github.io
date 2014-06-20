var Controller = function(grid,view){
	this.grid = grid;
	this.view = view;
};


Controller.prototype.load = function(reload){
	
	if(reload){
		var remove = this.grid.getFramesNoEmpty();
		this.view.rePaint(remove,[]);
	}

	var number = Math.floor(Math.random() * 16);
	this.view.paint(this.grid.frames[number],'html','2');
	this.view.paint(this.grid.frames[number],'css','background-color','orange');
	this.grid.frames[number].val = '2';
		
	var number2 = Math.floor(Math.random() * 16);
	while(number2==number){
		number2 = Math.floor(Math.random() * 16);
	} 

	this.view.paint(this.grid.frames[number2],'html','2');
	this.view.paint(this.grid.frames[number2],'css','background-color','orange');
	this.grid.frames[number2].val = '2';

};
Controller.prototype.move = function(){

	var framesToMove = this.grid.getFramesNoEmpty();
	return framesToMove;
};

Controller.prototype.dirToMove = function(way){

	var dirs = [];


	if(way=='right'){
		var line0 = this.grid.getFramesLine(0);
		var dirs0 = toMoveFrames(line0,'+');

		var line1 = this.grid.getFramesLine(1);
		var dirs1 = toMoveFrames(line1,'+');
		
		var line2 = this.grid.getFramesLine(2);
		var dirs2 = toMoveFrames(line2,'+');
		
		var line3 = this.grid.getFramesLine(3);
		var dirs3 = toMoveFrames(line3,'+');
		dirs = dirs0.concat(dirs1,dirs2,dirs3);
	
	}else if(way=='left'){
		var line0 = this.grid.getFramesLine(0);
		var dirs0 = toMoveFrames(line0,'-');
		
		var line1 = this.grid.getFramesLine(1);
		var dirs1 = toMoveFrames(line1,'-');
		
		var line2 = this.grid.getFramesLine(2);
		var dirs2 = toMoveFrames(line2,'-');
		
		var line3 = this.grid.getFramesLine(3);
		var dirs3 = toMoveFrames(line3,'-');

		dirs = dirs0.concat(dirs1,dirs2,dirs3);

	}else if(way=='up'){
		var col0 = this.grid.getFramesCol(0);
		var dirs0 = toMoveFrames(col0,'-');
		
		var col1 = this.grid.getFramesCol(1);
		var dirs1 = toMoveFrames(col1,'-');
		
		var col2 = this.grid.getFramesCol(2);
		var dirs2 = toMoveFrames(col2,'-');
		
		var col3 = this.grid.getFramesCol(3);
		var dirs3 = toMoveFrames(col3,'-');

		dirs = dirs0.concat(dirs1,dirs2,dirs3);

	}else if(way=='down'){
		var col0 = this.grid.getFramesCol(0);
		var dirs0 = toMoveFrames(col0,'+');

		var col1 = this.grid.getFramesCol(1);
		var dirs1 = toMoveFrames(col1,'+');
		
		var col2 = this.grid.getFramesCol(2);
		var dirs2 = toMoveFrames(col2,'+');

		var col3 = this.grid.getFramesCol(3);
		var dirs3 = toMoveFrames(col3,'+');

		dirs = dirs0.concat(dirs1,dirs2,dirs3);

	}

	return dirs;
};

var positionsOcupated = [];

/*Esta función deberia devolver las posiciones que se pintaran de la linea que le hemos pasado con su valor*/
var toMoveFrames = function(frames,dir){

	var dirs = [];
	for(var i=0;i<frames.length;i++){
		positionsOcupated[i] = false; 
	}

	count = 0;
	if(dir=='+'){

		/* Si es mas,comenzaremos desde la ultima posicion del array de frames ya que los frames irán hacia allá */
		for(var i=frames.length-1;i>=0;i--){
			if(frames[i].isEmpty()){
				continue;
			}
			positionsOcupated[i] = true;

			if(i!=frames.length-1){
				/*Comprobamos los siguientes frames desde el que estamos hasta el ultimo para ver si estan vacios o no y asi
				poder colocarlo en un sitio u otro, esta funcion nos devolvera un object con la posicion a la que ira y el valor*/
				var o = checkNextFrames(frames[i],i,dir,frames.length-1);
				if(!o){
					o = new Object();
					o['pos'] = frames[i].pos;
					o['value'] = frames[i].val;
				}
				frames[o.pos%frames.length].val = o.value; //Actualizo el valor del frame
				
				var update = jQuery.inArray(o.pos,dirs);
				if(update){
					dirs.splice(update,1);
				}
				dirs.push(o);
			}else{

				var ob = new Object();
				ob['pos'] = frames[i].pos;
				ob['value'] = frames[i].val;
				dirs.push(ob);
			}
		}
	}else{

		/* Si es menos,comenzaremos desde la primera posicion del array de frames ya que los frames irán hacia allá */
		for(var i=0;i<frames.length;i++){
			if(frames[i].isEmpty()){
				continue;
			}
			positionsOcupated[i] = true;

			if(i!=0){
				/*Comprobamos los siguientes frames desde el que estamos hasta el ultimo para ver si estan vacios o no y asi
				poder colocarlo en un sitio u otro, esta funcion nos devolvera un object con la posicion a la que ira y el valor*/
				var o = checkNextFrames(frames[i],i,dir,i);
				if(!o){
					o = new Object();
					o['pos'] = frames[i].pos;
					o['value'] = frames[i].val;
				}
				frames[o.pos%frames.length].val = o.value; 
				

				//Compruebo que si ha sido introducido antes dicha posicion la elimino
				var update = jQuery.inArray(o.pos,dirs);
				if(update){
					dirs.splice(update,1);
				}
				dirs.push(o);
			}else{
				var ob = new Object();
				ob['pos'] = frames[i].pos;
				ob['value'] = frames[i].val;
				dirs.push(ob);
			}
		}
	}
	positionsOcupated = [];
	return dirs;

};

var checkNextFrames = function(frame,pos,dir,length){

	/*El frame se moverá hasta el frame mas allá que este vacío, dependiendo hacia donde se mueva y demás*/

	var o = new Object();
	if(dir=='+'){	
		for(var i = length;i>pos;i--){
			if(positionsOcupated[i]==false){
				console.log(i);
				positionsOcupated[i] = true;
				positionsOcupated[pos] = false;
				o['pos'] = frame.line*frame.grid.cols + i;
				o['value'] = frame.val; 
				frame.grid.frames[i].val = o.value;
				return o;
			}else{
				console.log('Deberia entrar alguna vez');
				var framePosInI = frame.grid.getFrame(i,'line',frame.line);
				var valPosInI = framePosInI.val;
				if(parseInt(frame.val)==valPosInI){
					o['pos'] = framePosInI.pos;
					o['value'] = String(parseInt(frame.val)*2);
					framePosInI.val = o.value;
					return o;
				}
			}
		}
	}else{
		for(var i = 0;i<pos;i++){
			if(positionsOcupated[i]==false){
				positionsOcupated[i] = true;
				positionsOcupated[pos] = false;
				o['pos'] = frame.line*frame.grid.cols + i;
				o['value'] = frame.val; 
				frame.grid.frames[i].val = o.value;
				return o;
			}else{
				var framePosInI = frame.grid.getFrame(i,'line',frame.line);
				var valPosInI = framePosInI.val;
				if(parseInt(frame.val)==valPosInI){
					o['pos'] = framePosInI.pos;
					o['value'] = String(parseInt(frame.val)*2);
					framePosInI.val = o.value;
					return o;
				}
			}
		}
	}
};