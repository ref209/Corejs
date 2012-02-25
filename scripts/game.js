function MainGame(){
	
	starField = new StarField(fillElements(500));
	
	var playerValues = {topSpeed: 5.0, acceleration: 0.3, handling: 0.1, deceleration: 0.001, topSpeedBackward: -2.0, accelerationBackward: 0.1,
					pos: {x: GameContext.Canvas.width / 2, y: GameContext.Canvas.height / 2}, sprite: "./content/sprites/ship1.png"};
	var player = new Ship(playerValues);
	
	var playerCloneValues = {topSpeed: 5.0, acceleration: 0.3, handling: 0.1, deceleration: 0.001, topSpeedBackward: -2.0, accelerationBackward: 0.1,
							pos: {x: 30 / 2, y: 30}, sprite: "./content/sprites/ship1.png"};
	
	var playerClone = new Ship(playerCloneValues);
		
	
	function fillElements(num){
		var elements = [];
	    for(i=0; i<num;i++){
	    	var elementValues = {
	    		pos: {
	    			x: Math.random()*GameContext.Canvas.width + 1,
	    			y: Math.random()*GameContext.Canvas.height + 1
	    		},
	    		width: 1,
	    		height: 1  
	    	}
	        elements.push(new Element(elementValues));
	    }
	    return elements;
	}
}

function StarField(init){
	var stars = init || [];
	
	this.Update = function(){
		
	}
	
	this.PreDraw = function(){
		
	}
	
	this.Draw = function(){
		GameContext.Ctx.fillStyle = "White";
		for(var i=0,j=stars.length; i<j; i++){
			currentStarPosition = stars[i].GetPosition();
			currentStarDimension = stars[i].GetDimension();
		  	GameContext.Ctx.fillRect(currentStarPosition.x, currentStarPosition.y, currentStarDimension.width, currentStarDimension.height); 
		};
	}
	
	SubscribeCallContext(this);
}

function Element(init){
	var pos = init.pos || {x: 0, y: 0};
	var width = init.width || 1;
	var height = init.height || 1;
	
	this.GetPosition = function(){
		return pos;
	}
	
	this.GetDimension = function(){
		return { width: width, height: height };
	}
}

