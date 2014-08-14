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
		$('#score').html('Score: ' + 0);
		if(localStorage.getItem('highscore')){
			$('#highscore').html('HighScore: ' + localStorage.getItem('highscore'));
		}else{
			$('#highscore').html('HighScore: ' + 0);
		}
		this.view.rePaint(remove,[]);
	}
	
	var number = Math.floor(Math.random() * this.grid.cols*this.grid.lines);
	this.view.paint(this.grid.frames[number],'html','2',false);
	this.view.paint(this.grid.frames[number],'css','background-color','orange',false);
	this.grid.setValueFrame(number, '2');
		
	
	do{
		var number2 = Math.floor(Math.random() * this.grid.cols*this.grid.lines);
	}while(number2==number);

	this.view.paint(this.grid.frames[number2],'html','2',false);
	this.view.paint(this.grid.frames[number2],'css','background-color','orange',false);
	this.grid.setValueFrame(number2, '2');
	
	/*
	//Tests
	
	this.view.paint(this.grid.frames[0],'html','1024');
	this.view.paint(this.grid.frames[0],'css','background-color','orange');
	this.grid.frames[0].val = '1024';
	
	this.view.paint(this.grid.frames[4],'html','1024');
	this.view.paint(this.grid.frames[4],'css','background-color','orange');
	this.grid.frames[4].val = '1024';

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


	this.view.paint(this.grid.frames[1],'html','4');
	this.view.paint(this.grid.frames[1],'css','background-color','orange');
	this.grid.frames[1].val = '4';
	
	this.view.paint(this.grid.frames[2],'html','2');
	this.view.paint(this.grid.frames[2],'css','background-color','orange');
	this.grid.frames[2].val = '2';

	this.view.paint(this.grid.frames[3],'html','2');
	this.view.paint(this.grid.frames[3],'css','background-color','orange');
	this.grid.frames[3].val = '2';

	this.view.paint(this.grid.frames[5],'html','8');
	this.view.paint(this.grid.frames[5],'css','background-color','orange');
	this.grid.frames[5].val = '8';
	
	this.view.paint(this.grid.frames[6],'html','8');
	this.view.paint(this.grid.frames[6],'css','background-color','orange');
	this.grid.frames[6].val = '8';
	
	this.view.paint(this.grid.frames[14],'html','2');
	this.view.paint(this.grid.frames[14],'css','background-color','orange');
	this.grid.frames[14].val = '2';

	this.view.paint(this.grid.frames[10],'html','8');
	this.view.paint(this.grid.frames[10],'css','background-color','orange');
	this.grid.frames[10].val = '8';


	this.view.paint(this.grid.frames[13],'html','4');
	this.view.paint(this.grid.frames[13],'css','background-color','orange');
	this.grid.frames[13].val = '4';
	
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

	return dirs;
};

Controller.prototype.addFrame = function(way){
	do{
		var number = Math.floor(Math.random() * this.grid.cols*this.grid.lines);
	}while(!this.grid.frames[number].isEmpty());

	this.view.paint(this.grid.frames[number],'html','2',true);
	this.view.paint(this.grid.frames[number],'css','background-color','orange',true);
	this.grid.frames[number].val = '2';
	console.log('Posicion nuevo incluido: ' + number);

};

var positionsOcupated = [];

/*This function should give the position which must be painted of the line that receives*/
var toMoveFrames = function(frames,dir,way,framesRemove){

	var dirs = [];
	for(var i=0;i<frames.length;i++){
		positionsOcupated[i] = false; 
	}

	count = 0;
	if(dir=='+'){//More means that his moves is to position bigger than the current
		/* Begin from the last position of array because the frames move to there and the last frames are join*/
		for(var i=frames.length-1;i>=0;i--){
			if(frames[i].isEmpty()){
				continue;
			}
			positionsOcupated[i] = true;

			if(i!=frames.length-1){
				var o = movePositive(frames[i],i,way,frames.length-1,score);
				//this.grid.frames[o.pos].val = o.value;
				this.grid.setValueFrame(o.pos,o.value);

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
			}
		}
	}else{//Less means that his moves is to position smaller than the current

		/* Begin from first position of array because frames moves to there and the first frames are join */
		for(var i=0;i<frames.length;i++){
			if(frames[i].isEmpty()){
				continue;
			}
			positionsOcupated[i] = true;

			if(i!=0){
				var o = moveNegative(frames[i],i,way,i,score);
				//this.grid.frames[o.pos].val = o.value;
				this.grid.setValueFrame(o.pos,o.value);

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
			}
		}
	}
	positionsOcupated = [];
	view.incrementScores(score.getValue());
	return dirs;

};

var movePositive = function(frame,pos,way,length,score){

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