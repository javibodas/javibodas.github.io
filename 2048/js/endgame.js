var EndGame = function(controller){
	this.end = false;
	this.controller = controller;
};

EndGame.prototype = {

	endGameGood : function(mode){
		var response = confirm('Congratulations you have won. Do you want to retry?');
		if(response) controller.load(reload,mode);
	},
	endGameBad : function(mode){
		var high = localStorage.getItem('highscore_2048');
		var hscore = high && JSON.parse(high);	
		if(hscore[mode.getMode()] < score.getValue()){
			hscore[mode.getMode()] = score.getValue();
			localStorage.setItem('highscore_2048',JSON.stringify(hscore));
		}		
	},

	setEnd : function(end){
		this.end = end;
	},

	getEnd : function(){
		return this.end;
	}
}