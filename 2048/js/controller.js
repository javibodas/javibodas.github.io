var grid;
var view;
var score;
var Controller = function(grid,view,score){
	this.grid = grid;
	this.view = view;
	this.score = score;
};


Controller.prototype.load = function(reload){
	
	if(reload){
		var remove = this.grid.getFramesNoEmpty();
		this.score.setValue(0);
		this.view.rePaint(remove,[]);
	}
	
	var number = Math.floor(Math.random() * 16);
	this.view.paint(this.grid.frames[number],'html','2',false);
	this.view.paint(this.grid.frames[number],'css','background-color','orange',false);
	this.grid.frames[number].val = '2';
		
	var number2 = Math.floor(Math.random() * 16);
	while(number2==number){
		number2 = Math.floor(Math.random() * 16);
	} 

	this.view.paint(this.grid.frames[number2],'html','2',false);
	this.view.paint(this.grid.frames[number2],'css','background-color','orange',false);
	this.grid.frames[number2].val = '2';
	
	//Tests
	/*
	this.view.paint(this.grid.frames[0],'html','2048');
	this.view.paint(this.grid.frames[0],'css','background-color','orange');
	this.grid.frames[0].val = '4';
	
	this.view.paint(this.grid.frames[4],'html','2');
	this.view.paint(this.grid.frames[4],'css','background-color','orange');
	this.grid.frames[4].val = '2';

	this.view.paint(this.grid.frames[8],'html','2');
	this.view.paint(this.grid.frames[8],'css','background-color','orange');
	this.grid.frames[8].val = '2';

	this.view.paint(this.grid.frames[12],'html','8');
	this.view.paint(this.grid.frames[12],'css','background-color','orange');
	this.grid.frames[12].val = '8';
	
	this.view.paint(this.grid.frames[7],'html','8');
	this.view.paint(this.grid.frames[7],'css','background-color','orange');
	this.grid.frames[7].val = '8';
	
	this.view.paint(this.grid.frames[9],'html','2');
	this.view.paint(this.grid.frames[9],'css','background-color','orange');
	this.grid.frames[9].val = '2';

	this.view.paint(this.grid.frames[11],'html','8');
	this.view.paint(this.grid.frames[11],'css','background-color','orange');
	this.grid.frames[11].val = '8';


	this.view.paint(this.grid.frames[15],'html','4');
	this.view.paint(this.grid.frames[15],'css','background-color','orange');
	this.grid.frames[15].val = '4';
	*/
	grid = this.grid;
	view = this.view;
	score = this.score;
};

Controller.prototype.move = function(){

	var framesToMove = this.grid.getFramesNoEmpty();
	return framesToMove;
};

Controller.prototype.dirToMove = function(way,framesRemove){

	var dirs = [];
	var dirsaux = [];
	var line = [];
	var col = [];

	if(way=='right'){
		var count = 0;
		for(var i =0;i<this.grid.lines;i++){
		    line[i] = this.grid.getFramesLine(i);
			if(line[i].length>0){
				dirsaux[count] = toMoveFrames(line[i],'+','right',framesRemove);
				count++;
			}
		}

		for(var i=0;i<dirsaux.length;i++){
			dirs = dirs.concat(dirsaux[i]);
		}

	}else if(way=='left'){
		var count = 0;
		for(var i =0;i<this.grid.lines;i++){
		    line[i] = this.grid.getFramesLine(i);
			if(line[i].length>0){
				dirsaux[count] = toMoveFrames(line[i],'-','left',framesRemove);
				count++;
			}
		}

		for(var i=0;i<dirsaux.length;i++){
			dirs = dirs.concat(dirsaux[i]);
		}

	}else if(way=='up'){
		
		var count = 0;
		for(var i =0;i<this.grid.cols;i++){
		    col[i] = this.grid.getFramesCol(i);
			if(col[i].length>0){
				dirsaux[count] = toMoveFrames(col[i],'-','up',framesRemove);
				count++;
			}
		}

		for(var i=0;i<dirsaux.length;i++){
			dirs = dirs.concat(dirsaux[i]);
		}

	}else if(way=='down'){
		var count = 0;
		for(var i =0;i<this.grid.cols;i++){
		    col[i] = this.grid.getFramesCol(i);
			if(col[i].length>0){
				dirsaux[count] = toMoveFrames(col[i],'+','down',framesRemove);
				count++;
			}
		}

		for(var i=0;i<dirsaux.length;i++){
			dirs = dirs.concat(dirsaux[i]);
		}
	}

	console.log(dirs);
	return dirs;
};

Controller.prototype.addFrame = function(){

	var number = Math.floor(Math.random() * 16);
	while(!this.grid.frames[number].isEmpty()){
		number = Math.floor(Math.random() * 16);
	}
		this.view.paint(this.grid.frames[number],'html','2',true);
		this.view.paint(this.grid.frames[number],'css','background-color','orange',true);
		this.grid.frames[number].val = '2';
		console.log('Posicion nuevo incluido: ' + number);

};

var positionsOcupated = [];

/*Esta función deberia devolver las posiciones que se pintaran de la linea que le hemos pasado con su valor*/
var toMoveFrames = function(frames,dir,way,framesRemove){

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
			//console.log('Pos in array:' + i + '-> Frame:' + frames[i].val + ' ' + frames[i].pos);
			positionsOcupated[i] = true;

			if(i!=frames.length-1){
				/*Comprobamos los siguientes frames desde el que estamos hasta el ultimo para ver si estan vacios o no y asi
				poder colocarlo en un sitio u otro, esta funcion nos devolvera un object con la posicion a la que ira y el valor*/
				var o = movePositive(frames[i],i,way,frames.length-1,score);
				/*if(!o){
					o = new Object();
					o['pos'] = frames[i].pos;
					o['value'] = frames[i].val;
				}*/
				this.grid.frames[o.pos].val = o.value;
				
				if(frames[i].pos==o.pos && frames[i].val==o.value){
						var index = jQuery.inArray(frames[i],framesRemove);
						framesRemove.splice(index,1);
						continue;
				}

				var update = jQuery.inArray(o.pos,dirs);
				if(update>0){
					dirs.splice(update,1);
				}
				dirs.push(o);
			}else{

				var index = jQuery.inArray(frames[i],framesRemove);
				framesRemove.splice(index,1);
				/*
				var ob = new Object();
				ob['pos'] = frames[i].pos;
				ob['value'] = frames[i].val;

				dirs.push(ob);
				*/
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
				var o = moveNegative(frames[i],i,way,i,score);
				/*if(!o){
					o = new Object();
					o['pos'] = frames[i].pos;
					o['value'] = frames[i].val;
				}
				*/
				this.grid.frames[o.pos].val = o.value;
				
				if(frames[i].pos==o.pos && frames[i].val==o.value){
						var index = jQuery.inArray(frames[i],framesRemove);
						framesRemove.splice(index,1);
						continue;
				}

				//Compruebo que si ha sido introducido antes dicha posicion la elimino
				var update = jQuery.inArray(o.pos,dirs);
				if(update>0){
					dirs.splice(update,1);
				}
				dirs.push(o);
			}else{
				var index = jQuery.inArray(frames[i],framesRemove);
				framesRemove.splice(index,1);
				/*
				var ob = new Object();
				ob['pos'] = frames[i].pos;
				ob['value'] = frames[i].val;

				dirs.push(ob);
				*/
			}
		}
	}
	positionsOcupated = [];
	view.incrementScores(score.getValue());
	return dirs;

};

var movePositive = function(frame,pos,way,length,score){

	/*El frame se moverá hasta el frame mas allá que este vacío, dependiendo hacia donde se mueva y demás*/

	var o = new Object();
	for(var i = pos+1;i<=length;i++){
		if(i==length && positionsOcupated[i]==false){
			positionsOcupated[i] = true;
			positionsOcupated[pos] = false;
			if(way=='right'){
				o['pos'] = frame.line*frame.grid.cols + i;
			}else{
				o['pos'] = frame.col + frame.grid.lines*i;
			}
			o['value'] = frame.val; 
			return o;
		}
		if(positionsOcupated[i]==false){
			continue;
		}else{
			if(way=='right'){
				var framePosInI = grid.getFrame(i,'line',frame.line);
			}else{
				var framePosInI = grid.getFrame(i,'col',frame.col);
			}
			var valPosInI = framePosInI.val;
			if(parseInt(frame.val)==valPosInI){
				positionsOcupated[pos] = false;
				o['pos'] = framePosInI.pos;
				o['value'] = String(parseInt(frame.val)*2);
				score.setValue(score.getValue() + parseInt(o.value));
				return o;
			}else{
				positionsOcupated[i-1] = true;
				if(pos!=i-1){
					positionsOcupated[pos] = false;
				}
				if(way=='right'){
					var frameFree = grid.getFrame(i-1,'line',frame.line);
					o['pos'] = frame.line*frame.grid.cols + (i-1);
				}else{
					var frameFree = grid.getFrame(i-1,'col',frame.col);
					o['pos'] = frame.col + frame.grid.lines*(i-1);
				}
				o['value'] = frame.val;
				return o;
			}
		}
	}
};

var moveNegative = function(frame,pos,way,length,score){

	var o = new Object();
	for(var i = pos - 1;i>=0;i--){
			if(i==0 && positionsOcupated[i]==false){
				positionsOcupated[i] = true;
				positionsOcupated[pos] = false;
				if(way=='left'){
					o['pos'] = frame.line*frame.grid.cols + i;
				}else if(way=='up'){
					o['pos'] = frame.col + frame.grid.lines*i;
				}
				o['value'] = frame.val; 
				return o;
			}
			if(positionsOcupated[i]==false){
				continue;
			}else{
				if(way=='left'){
					var framePosInI = frame.grid.getFrame(i,'line',frame.line);
				}else{
					var framePosInI = frame.grid.getFrame(i,'col',frame.col);
				}
				var valPosInI = framePosInI.val;
				if(parseInt(frame.val)==valPosInI){
					positionsOcupated[pos] = false;
					o['pos'] = framePosInI.pos;
					o['value'] = String(parseInt(frame.val)*2);
					score.setValue(score.getValue() + parseInt(o.value));
					return o;
				}else{
					positionsOcupated[i+1] = true;
					if(pos!=i+1){
						positionsOcupated[pos] = false;
					}
					if(way=='left'){
						var frameFree = grid.getFrame(i+1,'line',frame.line);
						o['pos'] = frame.line*frame.grid.cols + (i+1);
					}else{
						var frameFree = grid.getFrame(i+1,'col',frame.col);
						o['pos'] = frame.col + frame.grid.lines*(i+1);
					}
					o['value'] = frame.val;
					return o;
				}
			}
		}

};