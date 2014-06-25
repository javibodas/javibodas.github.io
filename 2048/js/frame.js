var Frame = function(pos,col,line,val,grid){
	this.pos = pos;
	this.col = col;
	this.line = line;
	this.val = val;
	this.grid = grid;
};

Frame.prototype = {

	isFinal : function(way){
		if(way=='right'){
			if(this.pos==3 || this.pos==7 || this.pos==11 || this.pos==15){
				return true;
			}
		}else if(way=='left'){
			if(this.pos==0 || this.pos==4 || this.pos==8 || this.pos==12){
				return true;
			}
		}else if(way=='up'){
			if(this.pos==0 || this.pos==1 || this.pos==2 || this.pos==3){
				return true;
			}
		}else if(way=='down'){
			if(this.pos==12 || this.pos==13 || this.pos==14 || this.pos==15){
				return true;
			}
		}
		return false;
	},

	isEmpty : function(){

		if(this.val==''){
			return true;
		}else{
			return false;
		}
	}
}