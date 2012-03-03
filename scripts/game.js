function MainGame(){
	
	var cameraValues = { };
	var camera = new Camera(cameraValues);
	
	var playerValues = {topSpeed: 400.0, acceleration: 10, handling: 0.1, deceleration: 0.1, topSpeedBackward: -250, accelerationBackward: 10,
					pos: {x: GameContext.Canvas.width / 2, y: GameContext.Canvas.height / 2}, sprite: "./content/sprites/ship1.png"};
	var player = new Ship(playerValues);
	
	camera.SetTarget(player.GetPosition);
	
	var playerCloneValues = {topSpeed: 5.0, acceleration: 0.3, handling: 0.1, deceleration: 0.001, topSpeedBackward: -2.0, accelerationBackward: 0.1,
							pos: {x: 30 / 2, y: 30}, sprite: "./content/sprites/ship1.png"};
	var playerClone = new Ship(playerCloneValues);
	
	this.Update = function(){
		if(GameContext.PressedKeys.indexOf(GameContext.KEYS.ONE) != -1)
		{
			camera.SetTarget(player.GetPosition);
		}
		else if(GameContext.PressedKeys.indexOf(GameContext.KEYS.TWO) != -1)
		{
			camera.SetTarget(playerClone.GetPosition);
		}
	}
	
	this.PreDraw = function(){
		
	}
	
	this.Draw = function(){
		var target = camera.GetTargetPosition();
		var pos = camera.GetPosition();
		
		/*GameContext.Ctx.beginPath();
		
		GameContext.Ctx.moveTo(target.x, target.y);
		GameContext.Ctx.lineTo(pos.x, pos.y);
		
		GameContext.Ctx.closePath();
		
		GameContext.Ctx.stroke();*/
	}
	
	SubscribeCallContext(this);
		
}
