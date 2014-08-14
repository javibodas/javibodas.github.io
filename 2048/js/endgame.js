var EndGame = function(){
	this.end = false;
};

EndGame.prototype = {

	endGame : function(){
		alert('Congratulations has ganado');
	},

	setEnd : function(end){
		this.end = end;
	},

	getEnd : function(){
		return this.end;
	}
}