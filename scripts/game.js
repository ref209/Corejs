function MainGame(){
	
	var cameraValues = { };
	var camera = new Camera(cameraValues);
	
	/*var backgroundValues = {sprite: "./content/backgrounds/background_4.jpg"};
	var background = new Background(backgroundValues, camera);*/
	
	var playerValues = {topSpeed: 400.0, acceleration: 10, handling: 5, deceleration: 0.1, topSpeedBackward: -250, accelerationBackward: 10,
					pos: {x: GameContext.Canvas.width / 2, y: GameContext.Canvas.height / 2}, sprite: "./content/sprites/ship1.png"};
	var player = new Ship(playerValues);
	
	var targetValues = {pos: {x: 0, y: 0}, type: TargetType.Circle};
	
	var target = new Target(targetValues);
	
	camera.SetTarget(player.GetPosition);	
	
	
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
		var playerPosition = player.GetPosition();
		var targetPosition = target.GetPosition();
		
		GameContext.Ctx.beginPath();
		
		GameContext.Ctx.moveTo(playerPosition.x, playerPosition.y);
		GameContext.Ctx.lineTo(targetPosition.x, targetPosition.y);
		
		GameContext.Ctx.closePath();
		
		GameContext.Ctx.stroke();
	}
	
	SubscribeCallContext(this);
		
}
