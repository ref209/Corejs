function collisionTest(){
	var pos = {x: 50, y: 50};
	var color = "rgb(255,255,255)";
	var dimension = {width: 100, height: 100};
	
	this.OnImpact = function(){
		color = "rgb(" + Math.floor(Math.random()*256) + "," +  Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) +")";
	}
	
    this.GetPosition = function(){
    	return pos;
    }
    
    this.GetSpriteDimension = function(){
    	return dimension;
    }
    
    this.Draw = function(){
    	GameContext.Ctx.fillStyle = color;
    	GameContext.Ctx.fillRect(pos.x, pos.y, dimension.width, dimension.height);
    }
	
	SubscribeCallContext(this);
	this.id = SubscribeImpactable(this);
}

function MainGame(){
	
	var cameraValues = { };
	var camera = new Camera(cameraValues);
	
	var playerValues = {topSpeed: 400.0, acceleration: 10, handling: 5, deceleration: 0.1, topSpeedBackward: -250, accelerationBackward: 10,
					pos: {x: GameContext.Canvas.width / 2, y: GameContext.Canvas.height / 2}, sprite: "./content/sprites/ship1.png"};
	var player = new Ship(playerValues);
	
	
	
	var targetValues = {pos: {x: 0, y: 0}, type: TargetType.Circle, radius: 100};
	
	var target = new Target(targetValues);
	
	camera.SetTarget(player.GetPosition);	
	
	var test = new collisionTest();
	
	var navigator = new Navigator({getParentPos: player.GetCenterPosition, getTargetPos: target.GetPosition, sprite: "./content/sprites/navigator.png"});
	
	this.Update = function(){
		var playerPosition = player.GetPosition();
		var playerDimension = player.GetSpriteDimension();
		
		var targetPosition = target.GetPosition();
		var targetDimension = target.GetDimension();
		
		/*if (IsCollidingRectangle(playerPosition, playerDimension, targetPosition, targetDimension)) {
			target.SetPosition({x: Math.random()*10001, y: Math.random()*10001});
		}*/
		
		if (IsCollidingCircle(player.GetPosition(), target.GetPosition(), target.GetRadius())) {
			target.SetPosition({x: Math.random()*10001, y: Math.random()*10001});
		}
		
		if(GameContext.PressedKeys.indexOf(GameContext.KEYS.ONE) != -1)
		{
			camera.SetTarget(player.GetPosition);
		}
		else if(GameContext.PressedKeys.indexOf(GameContext.KEYS.TWO) != -1)
		{
			camera.SetTarget(target.GetPosition);
		}
	}
	
	this.Draw = function(){
		
	}
	
	SubscribeCallContext(this);
		
}
