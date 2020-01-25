
var Score = function(value){
	this.value = value;
};

Score.prototype.setValue = function(value){
	this.value = value;
};

Score.prototype.getValue = function(){

	return this.value;
};