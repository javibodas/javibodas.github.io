var Grid = function(lines,cols){
	this.cols = cols;
	this.lines = lines;
	this.frames;
};

Grid.prototype = {

	getFramesLine : function(line){
		var frames = [];
		var count = 0;
		for(var i = 0;i < this.frames.length/this.lines;i++){
			if(this.frames[line*this.cols+i].isEmpty()){
				count++;
			}
			frames[i] = this.frames[line*this.cols + i];
		}
		if(count==this.frames.length/this.lines){
			return [];
		}	
		return frames;
	},

	getFramesCol : function(col){
		var frames = [];
		for(var i = 0;i < this.frames.length/this.cols;i++){
			frames[i] = this.frames[this.lines*i + col];
		}

		return frames;
	},

	getFramesNoEmpty : function(){
		var framesNoEmpty = []; 
		var count = 0;
		$.each(this.frames,function(index){
			if(!this.isEmpty()){
				framesNoEmpty[count] = this;
				count++;
			}
		});
		return framesNoEmpty;
	},

	getNext : function(frame,dir,way){
		var next;
		var pos = frame.pos;
		
		if(dir=='+'){

			if(way=='down'){
				next = this.frames[pos + this.cols];
			}else if(way=='right'){
				next = this.frames[pos + 1];
			}
		}else if(dir=='-'){	
			if(way=='up'){
				next = this.frames[pos - this.cols];
			}else if(way=='left'){
				next = this.frames[pos - 1];
			}
		}
		return next;

	},

	getFrame : function(posInLineCol,mode,coline){
		var frame;
		if(mode=='col'){
			frame = this.frames[coline + posInLineCol*this.lines];
		}else if(mode=='line'){
			frame = this.frames[posInLineCol + coline*this.cols];
		}
		return frame;
	},

	setValueFrame : function(pos,value){
		this.frames[pos].val = value; 
	},

	isPosibleToMoveSomething : function(){
		var founded = false;
		var grid = this;

		$.each(this.frames,function(){
			if(this.isFinal('right')){
				if(grid.frames[this.pos-1].val==this.val){
					founded = true;
					return;
				}else if(!this.isFinal('down')){
					if(grid.frames[this.pos+4].val==this.val){
						founded=true;
						return;
					}
				}else if(this.isFinal('up')){
					if(grid.frames[this.pos-4].val==this.val){
						founded=true;
						return;
					}	
				}
			}else if(this.isFinal('left')){
				if(grid.frames[this.pos+1].val==this.val){
					founded=true;
					return;
				}else if(!this.isFinal('down')){
					if(grid.frames[this.pos+4].val==this.val){
						founded=true;
						return;
					}
				}else if(!this.isFinal('up')){
					if(grid.frames[this.pos-4].val==this.val){
						founded=true;
						return;
					}	
				}
			}else if(this.isFinal('up')){
				if(grid.frames[this.pos+1].val==this.val || grid.frames[this.pos-1].val==this.val || grid.frames[this.pos+4].val==this.val){
					founded=true;
					return;
				}

			}else if(this.isFinal('down')){
				if(grid.frames[this.pos+1].val==this.val || grid.frames[this.pos-1].val==this.val || grid.frames[this.pos-4].val==this.val){
					founded=true;
					return;
				}
			}else{

				if(grid.frames[this.pos+1].val==this.val || grid.frames[this.pos-1].val==this.val){
					founded=true;
					return;
				}else if(grid.frames[this.pos+4].val==this.val|| grid.frames[this.pos-4].val==this.val){
					founded=true;
					return;
				}
			}
		});

		return founded;
	}
}