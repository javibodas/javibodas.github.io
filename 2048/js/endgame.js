var EndGame = function(){
	this.end = false;
};

EndGame.prototype = {

	endGameGood : function(){
		alert('Congratulations has ganado');
	},
	endGameBad : function(mode){
						
		alert('El juego ha terminado');
		var high = localStorage.getItem('highscore_2048');
		var hscore = high && JSON.parse(high);	
		if(hscore[mode.getMode()] < score.getValue()){
			hscore[mode.getMode()] = score.getValue();
			localStorage.setItem('highscore_2048',JSON.stringify(highscore));
		}		
	},

	setEnd : function(end){
		this.end = end;
	},

	getEnd : function(){
		return this.end;
	}
}