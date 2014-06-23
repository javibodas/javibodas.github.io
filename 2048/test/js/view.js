
var View = function(grid){
	this.grid = grid;
};


View.prototype.paint = function(element,mode,value,value2,adding){

	if(mode=='html'){
		if(adding){
			$('#td' + element.pos).html(value).show('slow');
		}else{
			$('#td' + element.pos).html(value);
		}
		$('#td' + element.pos).html(value);
	}else if(mode=='css'){
		if(adding){
			$('#td' + element.pos).css(value,value2).show('slow');
		}else{
			$('#td' + element.pos).css(value,value2);
		}
	}
};

View.prototype.incrementScores = function(type,value){

	if(type=='score'){
		$('#score').html(value);
	}else if(type=='highscore'){

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
			var colorBackground;
			
			switch(this.value){
				case '2': colorBackground = 'orange'; break;
				case '4': colorBackground = 'blue'; break;
				case '8': colorBackground = 'green'; break;
				case '16': colorBackground = 'black'; break;
				case '32': colorBackground = 'grey'; break;
				case '64': colorBackground = 'brown'; break;
				case '128': colorBackground = 'yellow'; break;
				case '256': colorBackground = 'white'; break;
				case '512': colorBackground = 'pink'; break;
				case '1024': colorBackground = 'orange'; break;
				case '2048': colorBackground = 'orange'; break;
				default: colorBackground = 'orange';
			}

			view.paint(this,'css','background-color',colorBackground);
		});
	}
};