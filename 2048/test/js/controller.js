var grid;
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
	/*
	//Tests
	
	this.view.paint(this.grid.frames[0],'html','4');
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
};

Controller.prototype.move = function(){

	var framesToMove = this.grid.getFramesNoEmpty();
	return framesToMove;
};

Controller.prototype.dirToMove = function(way,framesRemove){

	var dirs = [];


	if(way=='right'){
		var line0 = this.grid.getFramesLine(0);
		//console.log('Line:' + 0);
		var dirs0 = toMoveFrames(line0,'+','right',framesRemove);

		var line1 = this.grid.getFramesLine(1);
		//console.log('Line:' + 1);
		var dirs1 = toMoveFrames(line1,'+','right',framesRemove);
		
		var line2 = this.grid.getFramesLine(2);
		//console.log('Line:' + 2);
		var dirs2 = toMoveFrames(line2,'+','right',framesRemove);
		
		var line3 = this.grid.getFramesLine(3);
		//console.log('Line:' + 3);
		var dirs3 = toMoveFrames(line3,'+','right',framesRemove);
		dirs = dirs0.concat(dirs1,dirs2,dirs3);
	
	}else if(way=='left'){
		var line0 = this.grid.getFramesLine(0);
		//console.log('Line:' + 0);
		var dirs0 = toMoveFrames(line0,'-','left',framesRemove);
		
		var line1 = this.grid.getFramesLine(1);
		//console.log('Line:' + 1);
		var dirs1 = toMoveFrames(line1,'-','left',framesRemove);
		
		var line2 = this.grid.getFramesLine(2);
		//console.log('Line:' + 2);
		var dirs2 = toMoveFrames(line2,'-','left',framesRemove);
		
		var line3 = this.grid.getFramesLine(3);
		//console.log('Line:' + 3);
		var dirs3 = toMoveFrames(line3,'-','left',framesRemove);

		dirs = dirs0.concat(dirs1,dirs2,dirs3);

	}else if(way=='up'){
		var col0 = this.grid.getFramesCol(0);
		//console.log('Col:' + 0);
		var dirs0 = toMoveFrames(col0,'-','up',framesRemove);
		
		var col1 = this.grid.getFramesCol(1);
		//console.log('Col:' + 1);
		var dirs1 = toMoveFrames(col1,'-','up',framesRemove);
		
		var col2 = this.grid.getFramesCol(2);
		//console.log('Col:' + 2);
		var dirs2 = toMoveFrames(col2,'-','up',framesRemove);
		
		var col3 = this.grid.getFramesCol(3);
		//console.log('Col:' + 3);
		var dirs3 = toMoveFrames(col3,'-','up',framesRemove);

		dirs = dirs0.concat(dirs1,dirs2,dirs3);

	}else if(way=='down'){
		var col0 = this.grid.getFramesCol(0);
		//console.log('Col:' + 0);
		var dirs0 = toMoveFrames(col0,'+','down',framesRemove);

		var col1 = this.grid.getFramesCol(1);
		//console.log('Col:' + 1);
		var dirs1 = toMoveFrames(col1,'+','down',framesRemove);
		
		var col2 = this.grid.getFramesCol(2);
		//console.log('Col:' + 2);
		var dirs2 = toMoveFrames(col2,'+','down',framesRemove);

		var col3 = this.grid.getFramesCol(3);
		//console.log('Col:' + 3);
		var dirs3 = toMoveFrames(col3,'+','down',framesRemove);

		dirs = dirs0.concat(dirs1,dirs2,dirs3);

	}


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
				var o = movePositive(frames[i],i,way,frames.length-1);
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
				var o = moveNegative(frames[i],i,way,i);
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
	return dirs;

};

var movePositive = function(frame,pos,way,length){

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

var moveNegative = function(frame,pos,way,length){

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
					framePosInI.val = o.value;
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