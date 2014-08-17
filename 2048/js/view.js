
var View = function(grid,end,mode){
	this.grid = grid;
	this.end = end;
	this.mode = mode;
};


View.prototype = {

	paint : function(element,mode,value,value2,adding){
		if(mode=='html'){
			if(adding){
				$('#td' + element.pos).html(value);
			}else{
				$('#td' + element.pos).html(value);
			}
				$('#td' + element.pos).css('opacity','0');
		}else if(mode=='css'){
			if(adding){
				$('#td' + element.pos).css(value,value2);
			}else{
				$('#td' + element.pos).css(value,value2);
			}
			$('#td' + element.pos).animate({opacity:1}, 100);
		}
	},

	incrementScores : function(value){
		var object = localStorage.getItem('highscore_2048');
		var highscore = object && JSON.parse(object);
		$('#score').html('Score: ' + value);
		if(value > highscore[this.mode.mode]){
			$('#highscore').html('HighScore: ' + value);
		}
	},

	rePaint : function(framesToRemove,framesToPaint){
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
				if(this.value==2048){
					view.end.setEnd(true);
				}
				var colorBackground;
			
				switch(this.value){
					case '2': colorBackground = 'orange'; break;
					case '4': colorBackground = '#A34900'; break;
					case '8': colorBackground = '#350000'; break;
					case '16': colorBackground = '#600000'; break;
					case '32': colorBackground = '#F99999'; break;
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
	}
}