var ModeGame = function(mode){
	this.mode = mode;
};

ModeGame.prototype = {
	setModeGame: function(mode){
		this.mode = mode;
	},
	getMode: function(){
		return this.mode;
	}
}