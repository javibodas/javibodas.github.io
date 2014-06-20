var View = function(grid){
	this.grid = grid;
};


View.prototype.paint = function(element,mode,value,value2){

	if(mode=='html'){
		$('#td' + element.pos).html(value);
	}else if(mode=='css'){
		$('#td' + element.pos).css(value,value2);
	}
};

View.prototype.rePaint = function(framesToRemove,framesToPaint){

	var view = this;
	if(framesToRemove.length>0){
		$.each(framesToRemove,function (){
			view.paint(this,'html','');
			view.paint(this,'css','background-color','#C6A664');
			this.val='';
		});
	}

	if(framesToPaint.length>0){
		$.each(framesToPaint,function(){
			view.grid.frames[this.pos].val = this.value;
			view.paint(this,'html',this.value);
			view.paint(this,'css','background-color','orange');
		});
	}
};